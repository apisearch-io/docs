Apisearch documentation
=======================
This is the main repository for all Apisearch related documentation.


## Quick start

To generate the documentation files whenever you edit the docs run:
```shell
./docgen
```
Docs resources are located in `src/content/`.

To serve the files run on the `http://localhost:1234/docs` run:
```shell
npm run server
```

## Devel styles and scripts

Once your server is running, you can develop your documentation
scripts and styles. They are located on `src/js` and `src/styles`
and to bundle them you need to run:
```shell
npm run watch
```

All the media (images/gifs/etc) must be placed on the `src/media` folder.


## How to write the docs

There are two types of doc files, the **root files** and the **children files**.
The children files must be in a directory called exactly the same as the root file
to be consistent with the architecture.

Root files work as a the main category on the menu, and children will 
be placed right below like in the example:
```yaml
root:
  - children
  - children  
root:
  - children
  - children
```

### Metadata:

All files must include a header `yaml` to configure its metadata like this:
```yaml
root: true
page: 1
icon: search
title: UI
description: A brief introduction of Apisearch UI, installation, and a basic usage.
category: UI
template: one-column.mustache
source: ui.md
languages: 
  - javascript
  - php
tags:
  - apisearch-tools
  - apisearch ui
  - search components
```

**Metadata anatomy:**
  - `root`: is only for those files that will work as a root. If the file is not 
  a root one, is not necessary to include this line.
  - `page`: to order the files once they are rendered on the menu.
  - `icon`: is the id of the **Fontawesome** icons. This will print an icon on 
  the menu.
  - `title`: the file title, it does not need to match with the filename.
  - `description`: a brief description of the file.
  - `category`: the category of the file content. This will need to match with 
  all other files with the same category. Otherwise this won't work properly.
  - `template`: the template layout to. For more information go to 
  [template system](#template-system) section.
  - `source`: the original source relative to the `src/content` folder.
  - `languages`: the languages that will be switchable on the document. 
  Language IDs will need to match with the same ID of the code on the markdown
  definition.
  - `tags`: tags are to give only extra information of the file.
  
The `title`, `description`, `tags`, and some other data will be also relevant
data for the Apisearch docs search.


### Content

Just below the metadata code, you can write your markdown content.

```markdown
# h1
## h2
### h3
#### h4
##### h5
```
And so on...

### Template system

The template system works with Hogan.js. And for now, there are only two type 
of templates.
  - `one-column.mustache`: this one is for files that doesn't need a table of 
  content, and will fill the full page.
  - `one-column-with-toc.mustache`: this one is for files that will need a table 
  of contents. It will appear a menu on the right side of the file automatically
  configured by the heading elements found in the markdown.


## Ready for production

Once you are done, just the following command to compile assets and bundle the
documentation:
```shell
npm run dist
```