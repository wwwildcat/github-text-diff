## GitHub text diff

This is Google Chrome extension sample to show the text diff of .RTF files on GitHub.

Based on [chrome-extension-webpack-boilerplate](https://github.com/samuelsimoes/chrome-extension-webpack-boilerplate) and [GitHub REST API](https://docs.github.com/en/rest).

### Libraries used:
- [rtf2text](https://github.com/bitfocus/rtf2text) for RTF parsing
- [jsdiff](https://github.com/kpdecker/jsdiff) for diff implementation
- [diff2html](https://github.com/rtfpessoa/diff2html) for HTML output

### Development

0. Install [yarn](https://classic.yarnpkg.com/en/docs/install) if needed
1. `yarn install`
2. `yarn run start`
3. Open `chrome://extensions/` and check `Developer mode`
4. Click on `Load unpacked extension`
5. Select the `build` folder

### Add GitHub Access token

For private repos you need to create a new GitHub Access Token:
1. Go to [https://github.com/settings/tokens](https://github.com/settings/tokens)
2. Generate a new token (select `repo` scope)
3. Click on extension icon and then on `Add GitHub Access token`

(OR Right-click on extension icon and then on `Options` in the dropdown menu)

4. Enter the valid token and click on `Save`