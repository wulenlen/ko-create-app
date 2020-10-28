module.exports = {
  /**
   * @description: 获取插件绝对路径
   * @Author: Charles
   * @Date: 2018-12-26 11:13:44
   */
  resolvePlugin: function (plugins) {
    return plugins.filter(Boolean).map(plugin => {
      if (Array.isArray(plugin)) {
        const [pluginName, ...args] = plugin;
        return [require.resolve(pluginName), ...args];
      }
      return require.resolve(plugin);
    });
  },
};
