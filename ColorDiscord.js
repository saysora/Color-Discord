class ColorDiscord {
  constructor() {
    console.log("Color Discord Activated");

    /* Create our base for themevars - variables to inject into Discord's styles */
    this.themevars = {
      emojionlysize: "3rem",
      inlineemojisize: "2rem",
      "brand-experiment":
        "hsl(235,calc(var(--saturation-factor, 1)*85.6%),64.7%)",
      "brand-experiment-560":
        "hsl(235,calc(var(--saturation-factor, 1)*51.4%),52.4%)",
      "video-call-bg": "#3e3e3e",
    };

    document.addEventListener("DOMContentLoaded", () => {
      /* Connect to local storage so we can both set and get the custom themes whenever discord loads */
      let ls = window.localStorage;
      let theme = ls.getItem("theme");

      /* This inject needs to happen after the preloader and in the main window */
      setTimeout(() => {
        /* If we don't find the theme, we're going to set it up */
        if (!theme) {
          /* Fancy reducer which takes the css variables from .theme-dark and puts them into an array */
          let cssvars = Array.from(document.styleSheets)
            .filter(
              (sheet) =>
                sheet.href === null ||
                sheet.href.startsWith(window.location.origin)
            )
            .reduce(
              (acc, sheet) =>
                (acc = [
                  ...acc,
                  ...Array.from(sheet.cssRules).reduce(
                    (def, rule) =>
                      (def =
                        rule.selectorText === ".theme-dark"
                          ? [
                              ...def,
                              ...Array.from(rule.style).filter((name) =>
                                name.startsWith("--")
                              ),
                            ]
                          : def),
                    []
                  ),
                ]),
              []
            );

          /* We then loop through each of them and add them as properties to our themevars object */
          cssvars.forEach((item) => {
            var style = getComputedStyle(document.body);
            this.themevars[item.replace("--", "")] =
              style.getPropertyValue(item);
          });

          ls.setItem("theme", JSON.stringify(this.themevars));
        } else {
          /* Otherwise, if the theme exists, we set our themevars to the existing local storage of the theme */
          this.themevars = JSON.parse(ls.getItem("theme"));
        }

        // Create Modal with custom styling

        const stylezone = document.createElement("style");
        stylezone.innerHTML = `
        .colordiscord-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.1);
          width: 100%;
          height: 100%;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
        }
        .colordiscord-modal-inner {
          box-sizing: border-box;
          width: 95%;
          height: 95%;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          background: #2f3640;
        }
        .colordiscord-modal-inner--h1 {
          font-size: 2rem;
          color: #fff;
        }

        .color-control-bar {
          padding: 1rem 0 0;
        }

        .color-filter-input {
          display: flex;
          flex-direction: column;
        }

        .color-filter-input label {
          color: #fff;
          padding: 10px 0;
          font-weight: bold;
        }

        .color-filter-input input[type="text"]{
          padding: 10px;
          border: 0;
          max-width: 250px;
        }
        
        .colorlist {
          padding: 1rem 0;
          display: flex;
          flex-direction: column;
          flex-wrap: wrap;
          gap: 1rem;
          height: 100%;
          overflow-y: auto;
        }

        .colorlist-item {
          display: flex;
          flex-wrap: wrap;
          
        }

        .colorlist-item label {
          width: 100%;
          padding: 10px 0;
          color: #fff;
          font-weight: bold;
        }

        .colorlist-item input[type="text"] {
          border: none;
          padding: 5px;
        }

        .colorlist-item button {
          border: none;
        }

        .colorlist-item .test-square {
          width: 23px;
          height: 23px;
          background: #fff;
          margin-left: 10px;
          align-self: center;
          border: 2px solid #fff;
        }

        /* Discord Overwrites */

        .emoji {
          width: var(--inlineemojisize);
          height: var(--inlineemojsize);
        }

        .emoji.jumboable {
          width: var(--emojionlysize);
          height: var(--emojionlysize);
        }

        /* Friend / People Column */
        .container-1D34oG {
          background-color: var(--background-primary) !important;
        }

        /* Discover a server */

        .pageWrapper-1PgVDX {
          background-color: var(--background-primary) !important;
        }
        /* Discover a server... language thing? */

        .css-1a1o7fb-control,.css-2dw5y-control,.css-bcsufo-menu {
          background-color: var(--background-tertiary) !important;
        }        

        /* File Share Modal */
        .uploadModal-2ifh8j {
          background-color: var(--background-primary) !important;
        }

        .uploadModal-2ifh8j .footer-3mqk7D {
          -webkit-box-shadow: none !important;
          box-shadow: none !important;
          background-color: var(--background-tertiary) !important;
        }

        /* Auto Completer */
          /* Auto complete box */
        .autocomplete-1vrmpx {
          background-color: var(--background-primary) !important;
        }
        /* Auto complete box server header */
        .categoryHeader-O1zU94 {
          background-color: var(--background-tertiary);
        }
        /* Auto complete item highlight */
        .selected-1Tbx07 {
          background-color: var(--background-secondary) !important;
        }

        /* Auto Complete Query option tooltip */
        .option-1B5ZV8 {
          background: var(--interactive-muted) !important;
        }

        /* Settings X in top right */

        .closeButton-1tv5uR {
          border-color: var(--interactive-normal) !important;
        }

        .closeButton-1tv5uR svg path {
          fill: var(--interactive-normal) !important;
        }
        
        .closeButton-1tv5uR:hover svg path {
          fill: var(--interactive-active) !important;
        }

        /* Change Your Username */

        .root-1gCeng {
          background-color: var(--background-primary) !important;
        }

        .footer-2gL1pp {
          background-color: var(--background-tertiary) !important;
        }

        /* Phone Number */ 

        .popoutList-T9CKZQ {
          background: var(--background-secondary) !important;
        }

        .lookFilled-1Gx00P.colorGrey-2DXtkV {
          background-color: var(--background-tertiary) !important;
        }

        .phoneField-38N1bJ {
          border: none !important;
        }

        /* Video Call BG */

        .wrapper-2qzCYF.theme-dark {
          background-color: var(--video-call-bg) !important;
        }

        `;

        /* Append our new style in prep for our modal to be used */
        document.querySelector("head").append(stylezone);

        // Create keybind for a modal to set your theme colors

        window.addEventListener("keydown", (e) => {
          if (e.ctrlKey && e.key == ".") {
            e.stopPropagation();
            if (document.querySelector("#ColorDiscord")) {
              document.querySelector("#ColorDiscord").remove();
            } else {
              this.setupTheme();
            }
          }
        });

        /* We create our own style tag specifically just for all of the properties in themevars */

        let colorStyles = document.createElement("style");

        colorStyles.setAttribute("id", "colorstyles");

        colorStyles.innerHTML = ":root {";
        /* And we loop through each property to place it in the style tag */
        Object.entries(this.themevars).forEach(([key, value]) => {
          colorStyles.innerHTML += `--${key}: ${value};`;
        });

        colorStyles.innerHTML += "}";

        document.querySelector("head").append(colorStyles);
      }, 3000);
    });
  }

  /**
   *
   * @param {array} array We take in an array with two items, key and value to setup our fields for color changes
   * @returns HTML template
   */
  createColorItem([key, value]) {
    const newkey = key.replace("-", " ");
    return `
    <form class="colorlist-item" data-name="${key}">
    <label>${newkey}</label>
    <input type="text" class="colorlist-item-input" placeholder="#123456" data-p="${key}" value="${value}" />
    <button class="colorlist-item-setter">SET</button>
    <div class="test-square" style="background: var(--${key});"></div>
    </form>
    `;
  }

  /**
   *
   * @param {event} e Function used to update the style of the theme.
   */
  setColorItem(e) {
    e.preventDefault();
    e.stopPropagation();
    const colorform = e.target.closest("form");
    const newcolor = colorform.querySelector('input[type="text"]');
    this.themevars[newcolor.dataset.p] = newcolor.value;
    this.updateVars();
  }

  /* Function to actually setup our theme modal for users to change their theme with as well as set our event listeners for opening and closing the theme gui */

  setupTheme() {
    let colorModal = document.createElement("div");
    colorModal.classList.add("colordiscord-modal");
    colorModal.setAttribute("id", "ColorDiscord");

    colorModal.innerHTML = `
      <div class="colordiscord-modal">
        <div class="colordiscord-modal-inner">
          <h1 class="colordiscord-modal-inner--h1">Color Discord</h1>
          <div class="color-control-bar">
            <div class="color-filter-input">
            <label for="fieldfilter">Filter</label>
              <input type="text"  name="fieldfilter" id="fieldfilter" placeholder="Filter">
            </div>
          </div>
          <div class="colorlist">
            ${Object.entries(this.themevars)
              .sort()
              .map(this.createColorItem)
              .join(" ")}
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(colorModal);

    document.addEventListener("click", (e) => {
      if (e.target.closest(".colorlist-item-setter")) {
        this.setColorItem(e);
      }
    });

    /* We want to allow the user to filter their view for the area they want to change so we create a simple filter */
    var filterinput = document.querySelector("#fieldfilter");

    filterinput.addEventListener("keyup", (e) => {
      const colorlist = document.querySelector(".colorlist");

      var results = Object.entries(this.themevars).filter(([key, value]) =>
        key.includes(e.target.value.toLowerCase().trim())
      );

      colorlist.innerHTML = `
      ${results.sort().map(this.createColorItem).join(" ")}`;
    });
  }

  /* When the user updates their theme we want to update our local storage instance to allow persisting colors across reloads */
  updateVars() {
    let ls = window.localStorage;
    ls.setItem("theme", JSON.stringify(this.themevars));

    let colorStyles = document.createElement("style");
    colorStyles.setAttribute("id", "colorstyles");
    colorStyles.innerHTML = ":root {";

    Object.entries(this.themevars).forEach(([key, value]) => {
      colorStyles.innerHTML += `--${key}: ${value};`;
    });

    colorStyles.innerHTML += "}";

    document.querySelector("#colorstyles").remove();
    document.querySelector("head").append(colorStyles);
  }
}

module.exports = ColorDiscord;
