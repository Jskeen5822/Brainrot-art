# Brainrot Art

Infinite doomscroll brainrot feed designed for a Raspberry Pi 5 kiosk display. The page fakes a TikTok-style stream of chaotic meme posts, ticker updates, and campus flavoured headlines so a library TV can loop brainrot 24/7 with no operator present.

## Files
- `index.html` entry point for the fullscreen feed.
- `assets/css/styles.css` layout and kiosk-friendly static styling.
- `assets/js/doomscroll.js` generates posts, metrics, ticker headlines, and drives the infinite scroll loop.
- `assets/media/` contains the meme art rotated into the feed.

## Run locally
1. From the project folder start a quick static server: `python -m http.server 8000`.
2. Open `http://localhost:8000` in a Chromium-based browser.
3. Hit F11 (or `fn` + F11 on some keyboards) for fullscreen.

## Raspberry Pi 5 kiosk quick start
- Copy the repo to the Pi (SSD on the Piromen 5 case works great).
- Install Chromium if missing: `sudo apt install chromium-browser`.
- Launch fullscreen kiosk manually for testing: `chromium-browser --kiosk --incognito http://localhost:8000`.
- To boot directly into the loop, add a systemd service or `~/.config/lxsession/LXDE-pi/autostart` entry that runs the command above after network and file system are ready.

## Customize the chaos
- Adjust wording pools in `doomscroll.js` to match new memes or campus jokes.
- Swap gradient palettes or card spacing in `styles.css` for different aesthetics.
- Drop your own PNG/SVG meme art into `assets/media/` and extend `MEDIA_LIBRARY` in `doomscroll.js` to rotate them into the scroll.

Once you are happy with the vibe, set the Pi to autostart Chromium on boot, plug the HDMI into the library TV, and let the doomscroll loop run on repeat.