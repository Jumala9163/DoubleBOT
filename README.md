# DoubleBOT

分身の術！！

## About

このBOTは指定したユーザーのステータスに応じてBOTのステータスが変わるBOTです
</br>
このBOTにユーザーがオフラインの際でもオフラインであることを分かりやすく表示します
</br>
使用方法についてはこの下を読んでください

## Requirement

・node.js `(^20.x.x)`
</br>
・discord.js `(14.15.3)`
</br>
</br>

## How to use

</br>

まずはこのリポジトリを任意の場所にクローンしてください

```bash
git clone https://github.com/Jumala9163/DoubleBOT.git
```

</br>

クローンしたらクローンした先のフォルダーに入っている`config.example.json`をコピーして`config.json`に名前を変更してください
</br>
変更後テキストエディタで`config.json`の中身を設定してください

</br>

`config.json`の中身について

```json
    "DISCORD_BOT_TOKEN" : "ボットのトークン", 
    "DISCORD_BOT_STATUS_MESSAGE" : "初期状態のボットのステータスメッセージ",
    "TARGET_GUILD_ID" : "指定したいユーザーが居るサーバーのID", 
    "TARGET_USER_ID" : "指定したいユーザー自身のID", 
    "TARGET_USER_OFFLINE_BOT_STATUS_MESSAGE" : "指定したユーザーがオフラインの時のボットのステータスメッセージ",
    "TARGET_USER_IDLE_BOT_STATUS_MESSAGE" : "指定したユーザーが退席中の時のボットのステータスメッセージ",
    "TARGET_USER_DND_BOT_STATUS_MESSAGE" : "指定したユーザーが取り込み中の時のボットのステータスメッセージ",
    "TARGET_USER_ONLINE_BOT_NICK" : "指定したユーザーがオンラインの時のボットのニックネーム",
    "TARGET_USER_OFFLINE_BOT_NICK" : "指定したユーザーがオフラインの時のボットのニックネーム",
    "TARGET_USER_IDLE_BOT_NICK" : "指定したユーザーが退席中の時のボットのニックネーム",
    "TARGET_USER_DND_BOT_NICK" : "指定したユーザーが取り込み中の時のボットのニックネーム"
```

</br>

次にパッケージのインストールをしてください

```bash
npm install
```

</br>

完了したら下記のコマンドを実行すれば動き出すはずです

```bash
npm start
```

</br></br>

©2024 [Jumala9163](https://github.com/Jumala9163)
</br>
[Released under the Apache-2.0 license](https://github.com/Jumala9163/DoubleBOT/blob/main/LICENSE)
