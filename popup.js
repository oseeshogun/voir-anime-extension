const listEl = document.getElementById("list");
const qEl = document.getElementById("q");

async function load() {
  const { history = {} } = await chrome.storage.local.get("history");
  return Object.values(history);
}

// Regroupe par anime (slug) : dernier épisode vu + nombre d'épisodes vus
function group(entries) {
  const byAnime = new Map();
  for (const e of entries) {
    const g = byAnime.get(e.slug) || { last: e, count: 0 };
    g.count++;
    if (e.watchedAt > g.last.watchedAt) g.last = e;
    byAnime.set(e.slug, g);
  }
  return [...byAnime.values()].sort((a, b) => b.last.watchedAt - a.last.watchedAt);
}

// Lien probable vers l'épisode suivant (le site affichera une erreur s'il n'existe pas)
function nextUrl(e) {
  const m = new URL(e.url).pathname.match(/^(.*-)(\d+)(-(?:vf|vostfr)\/?)$/i);
  return m ? new URL(e.url).origin + m[1] + (parseInt(m[2], 10) + 1) + m[3] : null;
}

async function render() {
  const q = qEl.value.trim().toLowerCase();
  const groups = group(await load()).filter((g) => g.last.title.toLowerCase().includes(q));
  listEl.textContent = "";
  if (!groups.length) {
    const d = document.createElement("div");
    d.className = "empty";
    d.textContent = "Aucun épisode pour l'instant.";
    listEl.append(d);
    return;
  }
  for (const { last, count } of groups) {
    const div = document.createElement("div");
    div.className = "anime";
    const a = document.createElement("a");
    a.href = last.url;
    a.target = "_blank";
    a.textContent = last.title;
    const meta = document.createElement("div");
    meta.className = "meta";
    meta.textContent = `Dernier : ép. ${last.episode} (${last.lang}) · ${count} vu(s) · ${new Date(last.watchedAt).toLocaleDateString("fr-FR")}`;
    const del = document.createElement("button");
    const next = nextUrl(last);
    if (next) {
      const n = document.createElement("a");
      n.href = next;
      n.target = "_blank";
      n.textContent = " · Suivant →";
      meta.append(n);
    }
    del.className = "del";
    del.textContent = "✕";
    del.title = "Supprimer cet anime de l'historique";
    del.addEventListener("click", () => removeAnime(last.slug));
    div.append(del, a, meta);
    listEl.append(div);
  }
}

async function removeAnime(slug) {
  const { history = {} } = await chrome.storage.local.get("history");
  for (const [path, e] of Object.entries(history)) {
    if (e.slug === slug) delete history[path];
  }
  await chrome.storage.local.set({ history });
  render();
}

qEl.addEventListener("input", render);
document.getElementById("clear").addEventListener("click", async () => {
  if (confirm("Vider tout l'historique ?")) {
    await chrome.storage.local.remove("history");
    render();
  }
});
render();
