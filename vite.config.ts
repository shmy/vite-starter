// @ts-ignore
import reactRefresh from '@vitejs/plugin-react-refresh'
import {defineConfig} from 'vite'
import vitePluginImp from "vite-plugin-imp";
// @ts-ignore
import * as fs from "fs";

export default defineConfig({
  plugins: [
    reactRefresh(),
    vitePluginImp({
      libList: [
        {
          libName: 'antd',
          style: (name) => {
            return `antd/lib/${name}/style/index.css`
          }
        }
      ]
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        // 注入变量
        additionalData(content: string) {
          const files = ['./src/styles/variables.scss'];
          return files.map(file => fs.readFileSync(file)).join('\r\n') + content;
        }
      }
    }
  },
  optimizeDeps: {
    include: ['mockjs', '@ant-design/icons']
  }
})
