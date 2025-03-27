# Auto compress image

- Automatically compress your images before commit

## How it works

- Add your (uncompressed) images to **src/common/assets/images**.
- Run **yarn auto:compress:images** to get compressed version, the output automatically replace uncompressed version in **src/common/assets/images**

**Note**: only work for uncommited changes

## In case you already commit your changes but forget to compress

- Revert your commit and re-run the script
- or manually compress it on [TinyPNG](https://tinypng.com)
