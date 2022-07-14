system='win'

if [[ "$1" ]]; then
    system=$1
fi

pnpm tsc -p ./tsconfig.json

pkg -c package.json -t "node16-${system}-x64" -o ./McAhZhengBot/McAhZhengBot ./dist/McAhZhengBot.js

cp -r ./lang ./McAhZhengBot
cp settings.json ./McAhZhengBot
cp config.json ./McAhZhengBot