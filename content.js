// Page d'épisode : /anime/{slug}/{slug}-{n}-{vf|vostfr}/
const EP_RE = /^\/anime\/([^/]+)\/([^/]+?)-(\d+(?:-\d+)?)-(vf|vostfr)\/?$/i;
const KEY = "history"; // { [episodePath]: { slug, title, episode, lang, url, watchedAt } }

const normPath = (p) => (p.endsWith("/") ? p : p + "/");

function prettify(slug) {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

async function getHistory() {
  const data = await chrome.storage.local.get(KEY);
  return data[KEY] || {};
}

async function recordEpisode() {
  const m = location.pathname.match(EP_RE);
  if (!m) return;
  const [, slug, , episode, lang] = m;
  const path = normPath(location.pathname);
  const history = await getHistory();
  history[path] = {
    slug,
    title: prettify(slug.replace(/-(vf|vostfr)$/i, "")),
    episode: episode.replace("-", "."),
    lang: lang.toUpperCase(),
    url: location.href,
    watchedAt: Date.now(),
  };
  await chrome.storage.local.set({ [KEY]: history });
}

// Marque les liens d'épisodes déjà vus (liste d'épisodes, accueil...)
async function markSeen() {
  const history = await getHistory();
  document.querySelectorAll('a[href*="/anime/"]').forEach((a) => {
    let path;
    try {
      path = normPath(new URL(a.href).pathname);
    } catch {
      return;
    }
    if (history[path]) a.classList.add("va-seen");
  });
}

// Barre épisode précédent / suivant (affichée seulement si la page existe)
async function episodeExists(path) {
  try {
    const res = await fetch(path, { method: "HEAD", credentials: "include" });
    return res.ok;
  } catch {
    return false;
  }
}

async function addNavBar() {
  const m = location.pathname.match(EP_RE);
  if (!m || m[3].includes("-")) return;
  const [, slug, base, num, lang] = m;
  const n = parseInt(num, 10);
  const pathFor = (k) => `/anime/${slug}/${base}-${k}-${lang.toLowerCase()}/`;
  const history = await getHistory();

  const bar = document.createElement("div");
  bar.className = "va-nav";
  const add = async (k, label) => {
    if (k < 1 || !(await episodeExists(pathFor(k)))) return;
    const a = document.createElement("a");
    a.href = pathFor(k);
    a.textContent = label.replace("{n}", k) + (history[pathFor(k)] ? " ✓" : "");
    bar.append(a);
  };
  await add(n - 1, "← Épisode {n}");
  await add(n + 1, "Épisode {n} →");
  if (bar.children.length) document.body.append(bar);
}

recordEpisode();
addNavBar();
markSeen();

let timer;
new MutationObserver(() => {
  clearTimeout(timer);
  timer = setTimeout(markSeen, 500);
}).observe(document.body, { childList: true, subtree: true });
