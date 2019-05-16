import React from 'react';
import { Tree } from 'antd';

const { TreeNode } = Tree;

const treeData = [
  {
    title: '',
    key: '0-0',
    children: [
      {
        title: '',
        key: '0-0-0',
        children: [
          { title: '0-0-0-0', key: '0-0-0-0' },
          { title: '0-0-0-1', key: '0-0-0-1' },
          { title: '0-0-0-2', key: '0-0-0-2' },
        ],
      },
      {
        title: '0-0-1',
        key: '0-0-1',
        children: [
          { title: '0-0-1-0', key: '0-0-1-0' },
          { title: '0-0-1-1', key: '0-0-1-1' },
          {
            title: '0-0-0-0-1',
            key: '0-0-0-0-1',
            children: [
              { title: '0-0-0-1-0', key: '0-0-0-1-0' },
              { title: '0-0-0-1-1', key: '0-0-0-1-1' },
              { title: '0-0-0-1-2', key: '0-0-0-1-2' },
            ],
          },
        ],
      },
      {
        title: '0-0-2',
        key: '0-0-2',
      },
    ],
  },
  {
    title: '0-1',
    key: '0-1',
    children: [
      { title: '0-1-0-0', key: '0-1-0-0' },
      { title: '0-1-0-1', key: '0-1-0-1' },
      { title: '0-1-0-2', key: '0-1-0-2' },
    ],
  },
  {
    title: '0-2',
    key: '0-2',
  },
];

class PhyloTree extends React.Component {
  state = {
    expandedKeys: ['0-0-0', '0-0-1'],
    autoExpandParent: true,
    checkedKeys: ['0-0-0'],
    selectedKeys: [],
  };

  onExpand = expandedKeys => {
    console.log('onExpand', expandedKeys);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };

  onCheck = (checkedKeys, e) => {
    console.log('onCheck', checkedKeys);
    console.log('onCheck', e);
    console.log('onCheck', e.node);
    let keys = [];
    this.checkNode(e.node.props.dataRef, keys);
    console.log(keys);
    this.setState({ checkedKeys: keys });
  };

  checkNode = (node, keys) => {
    const c = this.checkNode;
    if (node.key) keys.push(node.key);
    if (node.children) node.children.forEach(n => c(n, keys));
  }

  onSelect = (selectedKeys, info) => {
    console.log('onSelect', info);
    this.setState({ selectedKeys });
  };

  renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} />;
    });

  render() {
    return (
      <Tree
        checkable
        onExpand={this.onExpand}
        expandedKeys={this.state.expandedKeys}
        autoExpandParent={this.state.autoExpandParent}
        onCheck={this.onCheck}
        checkedKeys={this.state.checkedKeys}
        onSelect={this.onSelect}
        selectedKeys={this.state.selectedKeys}
      >
        {this.renderTreeNodes(treeData)}
      </Tree>
    );
  }
}

export default PhyloTree;