const _ = require("lodash");

function treeBuilder(files) {
    let rootFiles = _.orderBy(
        _.filter(files, 'root'),
        'page'
    );
    let rootFileCategories = _.groupBy(rootFiles, 'category');
    let rootFileCategoryKeys = Object.keys(rootFileCategories);

    let tree = _.groupBy(files, "category");

    return rootFileCategoryKeys
        .map(function(category) {
            let rootCategory = rootFileCategories[category][0];
            let hasChildren = (tree[category].length > 1);

            return {
                category_name: category,
                category_url: rootCategory.url,
                category_icon: rootCategory.icon,
                page: rootCategory.page,
                root: !!rootCategory.root,
                has_children: hasChildren,
                children: () => {
                    let children = tree[category];
                    _.remove(children, (item) => item.root === true);

                    return (hasChildren)
                        ? _.orderBy(children, "page")
                        : null
                }
            }
        })
    ;
}

module.exports = treeBuilder;