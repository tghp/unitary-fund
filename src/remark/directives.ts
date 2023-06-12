import 'remark-directive';
import type { Plugin } from 'unified';
import type { Root } from 'mdast';
import { visit } from 'unist-util-visit';
import { Cloudinary } from '@cloudinary/url-gen';
import { Resize } from '@cloudinary/url-gen/actions/resize';
import { cld } from './src/util/cloudinary';

export const imageDirective: Plugin<[], Root> = () => {
  return (tree, file) => {
    visit(tree, (node) => {
      if (
        node.type === 'textDirective' ||
        node.type === 'leafDirective' ||
        node.type === 'containerDirective'
      ) {
        if (node.name !== 'image') return;

        const data = node.data || (node.data = {});
        // const attributes = node.attributes || {};

        // if (node.type === "textDirective")
        //   file.fail("Text directives for `gist` not supported", node);

        // if (!id) file.fail("Missing video id", node);

        if (node.children?.length === 1 && node.children[0].type === 'text') {
          const imageId = node.children[0].value?.trim();
          const image = cld.image(imageId);
          image.resize(Resize.scale().width(800));

          data.hName = 'img';
          data.hProperties = {
            src: image.toURL(),
          };
          node.children = [];
        }

        // <script src="https://gist.github.com/BenjaminAbt/ee4f77b9c5f3068506dd0d43df57f8f8.js"></script>
      }
    });
  };
};

export const gistDirective: Plugin<[], Root> = () => {
  return (tree, file) => {
    visit(tree, (node) => {
      if (
        node.type === 'textDirective' ||
        node.type === 'leafDirective' ||
        node.type === 'containerDirective'
      ) {
        if (node.name !== 'gist') return;

        const data = node.data || (node.data = {});
        // const attributes = node.attributes || {};

        if (node.type === 'textDirective')
          file.fail('Text directives for `gist` not supported', node);

        // if (!id) file.fail("Missing video id", node);

        if (node.children?.length === 1 && node.children[0].type === 'text') {
          const gistPath = node.children[0].value
            ?.trim()
            .replace(/^\/*/, '')
            .replace(/\/*$/, '');

          // TODO: Validate path

          // if (gistPath.match)

          data.hName = 'script';
          data.hProperties = {
            src: `https://gist.github.com/${gistPath}.js`,
          };
          node.children = [];
        }

        // <script src="https://gist.github.com/BenjaminAbt/ee4f77b9c5f3068506dd0d43df57f8f8.js"></script>
      }
    });
  };
};
