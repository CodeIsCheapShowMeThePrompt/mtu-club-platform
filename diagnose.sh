#!/bin/bash

# 美团大学社团项目 - 一键诊断脚本
# 功能：自动检查类型错误、导入错误、文件结构等

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}========================================${NC}"
echo -e "${YELLOW}  美团大学社团项目 - 诊断开始${NC}"
echo -e "${YELLOW}========================================${NC}"
echo ""

# 1. 检查是否在项目根目录
echo -e "${GREEN}[1/6] 检查项目根目录...${NC}"
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ 错误：请在项目根目录运行此脚本（找不到 package.json）${NC}"
    exit 1
fi
echo -e "${GREEN}✅ 项目根目录确认${NC}"
echo ""

# 2. 检查依赖是否安装
echo -e "${GREEN}[2/6] 检查依赖安装...${NC}"
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}⚠️  警告：node_modules 不存在，正在自动安装依赖...${NC}"
    npm install
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ 依赖安装失败，请手动运行 npm install${NC}"
        exit 1
    fi
fi
echo -e "${GREEN}✅ 依赖已安装${NC}"
echo ""

# 3. 检查关键目录结构 (核心修复：改为 src/app)
echo -e "${GREEN}[3/6] 检查文件结构...${NC}"
required_dirs=("src/app" "src/app/components" "src/app/hooks" "src/app/types" "src/app/data")
missing_dirs=()
for dir in "${required_dirs[@]}"; do
    if [ ! -d "$dir" ]; then
        missing_dirs+=("$dir")
    fi
done

if [ ${#missing_dirs[@]} -ne 0 ]; then
    echo -e "${YELLOW}⚠️  缺少以下目录（请确保已创建）：${NC}"
    for d in "${missing_dirs[@]}"; do
        echo -e "  - $d"
    done
else
    echo -e "${GREEN}✅ 目录结构完整${NC}"
fi
echo ""

# 4. TypeScript 类型检查（核心！这是所有飘红的根源）
echo -e "${GREEN}[4/6] 运行 TypeScript 类型检查...${NC}"
if ! command -v npx &> /dev/null; then
    echo -e "${RED}❌ npx 不可用${NC}"
    exit 1
fi

npx tsc --noEmit
tsc_exit_code=$?

if [ $tsc_exit_code -eq 0 ]; then
    echo -e "${GREEN}✅ TypeScript 类型检查通过（没有飘红！）${NC}"
else
    echo -e "${RED}❌ TypeScript 发现类型错误（上面的就是飘红原因）${NC}"
    echo ""
    echo -e "${YELLOW}💡 常见修复提示：${NC}"
    echo -e "  1. 检查所有 import 路径是否正确（特别是 @/ 别名）"
    echo -e "  2. 检查组件/类型是否正确 export 和 import"
    echo -e "  3. 检查 props 传递是否匹配类型定义"
fi
echo ""

# 5. ESLint 检查
echo -e "${GREEN}[5/6] 运行 ESLint 检查...${NC}"
npx eslint . --ext .ts,.tsx
eslint_exit_code=$?

if [ $eslint_exit_code -eq 0 ]; then
    echo -e "${GREEN}✅ ESLint 检查通过${NC}"
else
    echo -e "${YELLOW}⚠️  ESLint 发现代码规范问题（不影响运行，但建议修复）${NC}"
fi
echo ""

# 6. 尝试 Next.js 构建（最终验证）
echo -e "${GREEN}[6/6] 尝试 Next.js 构建验证...${NC}"
echo -e "${YELLOW}（这步可能需要一点时间，是最终验证）${NC}"
npx next build
build_exit_code=$?

echo ""
echo -e "${YELLOW}========================================${NC}"
echo -e "${YELLOW}  诊断完成${NC}"
echo -e "${YELLOW}========================================${NC}"
echo ""

if [ $tsc_exit_code -eq 0 ] && [ $build_exit_code -eq 0 ]; then
    echo -e "${GREEN}🎉 恭喜！项目没有致命错误，可以正常运行！${NC}"
    echo -e "${GREEN}   运行 npm run dev 启动项目${NC}"
else
    echo -e "${RED}❌ 发现需要修复的错误${NC}"
    echo -e "${YELLOW}💡 请先修复上面 TypeScript 检查出的错误（最优先）${NC}"
fi

echo ""