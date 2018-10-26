# hexo-html-minifier-plus

HTML minifier & optimization plugin for [Hexo](https://hexo.io).

## Installation
```bash
$ npm install git+https://git@github.com/Kurosnape/hexo-html-minifier-plus.git --save
```

## Usage
Put this line in the root `_config.yml` file to enable this plugin.
```yaml
html_minifier_plus:
  enable: true
```

## Options
You can set options of this plugin.
```yaml
html_minifier_plus:
  slient: false
  exclude:
```
- **slient** - Disable logging optimize information. Defaults to `false`
- **exclude** - Exclude files from optimization. Glob is support.
