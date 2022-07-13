system='win'

if [[ "$1" ]]; then
    system=$1
fi

pkg -c package.json -t "node16-${system}-x64" -o ./McAhZhengBot/McAhZhengBot ./dist/McAhZhengBot.js
