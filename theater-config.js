// ============================================================
//  上映モードの設定ファイル
//  映像やBGMを本番用に差し替えるときは、media フォルダの同じ名前のファイルを
//  置き換えるか、下のパスを書き換えてください。
// ============================================================
window.THEATER_CONFIG = {
  // 映像ファイル（mp4推奨）
  videos: {
    op: "media/op.mp4",                       // オープニング（今は AE で仕上げる前の Blender の連番をまとめた仮）
    wait: "media/wait_loop.mp4",              // 待機：館と月、霧と窓の灯りがゆれる60秒ループ（OP の1コマ目と同じ絵）
    idle: "media/idle_loop.mp4",              // 待機・ゲーム中の背景（ループ再生）
    jonah_lights: "media/jonah_lights.mp4",   // ジョナEND：光の中の人影 → 館の窓が全部光る
    jonah_exit: "media/jonah_exit.mp4",       // ジョナEND：扉が開いて、館のあるじが外へ出てくる
    legion_missile: "media/legion_missile.mp4", // レギオンEND：館の屋根にミサイル → 黒煙
    legion_moonlight: "media/legion_moonlight.mp4" // レギオンEND：地下の天井の穴から月明かり（外へ出られる＝助けが来た）
  },

  // BGMファイル（mp3推奨・ループ再生）
  bgm: {
    idle: "media/bgm_idle.mp3",         // 待機中
    ending: "media/bgm_ending.mp3",     // エンディング本編
    epilogue: "media/bgm_epilogue.mp3"  // エピローグ
  },

  // どの章でどのBGMを流すか（上から順に見て、最初に当てはまったもの）
  //   seg：章のIDにこの文字が含まれていたら当てはまる（"" はすべてに当てはまる）
  sceneBgm: [
    { seg: "EPILOGUE_", bgm: "epilogue" },
    { seg: "", bgm: "ending" }
  ],

  // 映像を流すタイミング
  //   seg   ：章のID（正規表現）
  //   at    ："start"＝章の最初 / "end"＝章の最後 / それ以外の文字＝その文字を含む段落が出た直後
  //   video ：上の videos の名前
  cues: [
    // ジョナEND：電灯が灯る段落のあと／館のあるじが外へ出る段落のあと
    { seg: "^MAIN_A_JOHN_COOK_END$", at: "一斉に全ての電灯が灯り", video: "jonah_lights" },
    { seg: "^MAIN_A_JOHN_COOK_END$", at: "1階のドアから悠々と外へ出て", video: "jonah_exit" },
    // レギオンEND：「ドォーン！」で屋上が爆発する段落のあと、ミサイル → 地下の天井の穴から月明かり（続けて流す）
    { seg: "^MAIN_B_", at: "ドォーン", video: "legion_missile" },
    { seg: "^MAIN_B_", at: "ドォーン", video: "legion_moonlight" }
  ],

  // 背景用の静止画（ゆっくり動かして表示します）
  images: {
    town: "media/town.jpg",                   // シチリアの海とマフィアの街（前の仮素材）
    title_wait: "media/title_wait.png",       // 待機画面の文字（REQUIEⅢ・開演まで しばらくお待ちください）を重ねる透明画像
    masks: "media/masks_table.jpg",           // キャラクター選択：円卓の上に7つのマスク（名前は出さない）
    masks_base: "media/masks_base.jpg",       // 読み込み：マスクの無い円卓（マスクは maskSprites で1枚ずつ重ねる）
    p1_investigate: "media/p1_investigate.jpg", // 第1フェーズ 調査：2階の間取り＋大広間（不透明度35%）
    p1_discuss: "media/p1_discuss.jpg",       // 第1フェーズ 議論：大広間
    p2_investigate: "media/p2_investigate.jpg", // 第2フェーズ 調査：1階の間取り＋リビング（懐中電灯）
    p2_discuss: "media/p2_discuss.jpg",       // 第2フェーズ 議論：リビング（ランタン・暖炉・ろうそく）
    p3_discuss: "media/p3_discuss.jpg"        // 第3フェーズ：地下の円卓（緑のランタン）
  },

  // 効果音
  sounds: {
    timeUp: "media/chime.mp3"                 // タイマーが0になったとき
  },

  // 読み込みの円卓に1枚ずつ置くマスク（maskTake: true の場面）。x,y,w,h は画面に対する%、angle は円卓の中心から見た向き（取られる方向）
  //   進行アプリ_背景案/tools/make_charselect.py sprites で作り直すと、この値も出る
  maskSprites: [
    { src: "media/mask_1.png", x: 44.01,  y: 2.13,   w: 12.135, h: 30.463, angle: -90.0 },
    { src: "media/mask_2.png", x: 55.104, y: 18.241, w: 17.344, h: 28.148, angle: -38.6 },
    { src: "media/mask_3.png", x: 59.427, y: 46.667, w: 17.24,  h: 22.13,  angle: 12.9 },
    { src: "media/mask_4.png", x: 49.427, y: 62.778, w: 15.573, h: 32.778, angle: 64.3 },
    { src: "media/mask_5.png", x: 35.885, y: 63.148, w: 15.104, h: 32.037, angle: 115.7 },
    { src: "media/mask_6.png", x: 23.177, y: 45.185, w: 17.604, h: 24.444, angle: 167.1 },
    { src: "media/mask_7.png", x: 28.177, y: 19.537, w: 15.469, h: 23.704, angle: 218.6 }
  ],
  // 配役発表：画像は設定書 P1 をそのまま。castHideNames: true でキャラクターの名前は出さず、画像の下にプレイヤー名だけ
  castHideNames: true,
  // 配役発表に出すキャラクター（この順番で1人ずつ出ます）
  characters: [
    { id: "luca",   name: "ルカ",     image: "media/cover_luca.jpg" },
    { id: "carlo",  name: "カルロ",   image: "media/cover_carlo.jpg" },
    { id: "dante",  name: "ダンテ",   image: "media/cover_dante.jpg" },
    { id: "bianca", name: "ビアンカ", image: "media/cover_bianca.jpg" },
    { id: "jonah",  name: "ジョナ",   image: "media/cover_jonah.jpg" },
    { id: "lucia",  name: "ルチア",   image: "media/cover_lucia.jpg" },
    { id: "biagio", name: "ビアージョ", image: "media/cover_biagio.jpg" }
  ],

  // ===== 進行表：上から順にモニターに流れます（コントロールの「次へ」で進む） =====
  //   type: "loop"   … 背景を流しっぱなし（bg に images か videos の名前）
  //         "cast"   … 配役発表（キャラ画像＋プレイヤー名）
  //         "video"  … 映像を1本流す（autoNext: true なら終わったら自動で次へ）
  //         "timer"  … 背景＋タイマー（minutes で時間）
  //         "ending" … エンディング（判定結果に合わせて上映）
  //   phase: フェーズ名（タイマーの上に小さく出ます） / showTitle: true で背景の上にシーン名を大きく出す
  //   still: true … 背景を動かさない・暗くしない（作った背景はこれ） / overlay: 背景の上に重ねる images の名前
  //   timerPos: "right"＝右下（調査の間取り）／"top"＝上（第3フェーズ）／書かない＝真ん中
  //   brightness: その場面の背景の明るさ（無ければ stillBrightness） / drift: true で背景がゆっくり寄っていく
  scenes: [
    { type: "loop",   title: "開場・待機", bg: "wait", still: true, brightness: 1, overlay: "title_wait", bgm: "idle" },
    // 1. オープニング：待機の絵から黒を挟まずに OP の1コマ目へ。止めたまま導入の文章 → playFrom の段落から OP が動き出す
    //    （台本は書き換え予定。paras の1つが1画面。playFrom はその段落に含まれる言葉）
    { type: "video",  phase: "オープニング", title: "潜入", video: "op", autoNext: true, bgm: "idle",
      intro: {
        playFrom: "そこで、信頼のおける",
        paras: [
          "時は1995年。この街には、巨大マフィア組織「レギオン」が存在する。街の裏社会を支配するレギオン。そのボスは、組織内でも限られた者しか素顔を知らない謎の人物だ。",
          "ある日、レギオンの幹部が、とある館への潜入調査中に消息を絶った。その館の名は「シャッターランド」。幹部は組織にとって重要な情報を握っており、敵組織から狙われているという。",
          "そこで、信頼のおける7人の組員が集められた。今回の任務は、シャッターランドに潜入し、隠し部屋に身を潜めている幹部を救出すること。",
          "この任務は超極秘に行われる。組員全員の安全を確保するため、各自に動物のマスクが支給され、互いの素顔を確認することは禁止されている。",
          "決行は今夜0時――。"
        ]
      } },
    // 2. キャラクター選択・読み込み
    { type: "cast",   phase: "キャラクター選択", title: "配役発表", bgm: "idle" },
    { type: "timer",  phase: "キャラクター選択", title: "読み込み", minutes: 15, bg: "masks_base", still: true, maskTake: true, timerPos: "right", bgm: "idle" },   // 0になったらマスクが一斉に取られる
    // 3. ルール説明
    { type: "loop",   title: "ルール説明", bg: "wait", still: true, brightness: 1, drift: true, bgm: "idle",
      // 台本「02｜ルール説明」。1つが1画面、「\n」で改行、【】の行は見出し。→キーで送る。時間は進行表に合わせた（第1議論20分、第3フェーズ30分）
      script: [
        "【基本ルール】\nこれから皆さんには、それぞれ一人のキャラクターを演じていただきます。\n設定書には、あなたの生い立ちや今回の任務、目的、他の人には知られていない秘密などが書かれています。",
        "自分の情報を誰に、どこまで伝えるかは自由です。\nただし、設定書そのものを他のプレイヤーに見せることはできません。\nゲームは大きく3つのフェーズに分かれ、その後クライマックスフェーズへと進みます。",
        "【調査フェーズ】\n調査フェーズでは、館の中を探索し、情報を集めていただきます。\n調査トークンを1枚使用することで、調査カードを1枚取得することができます。\n第1フェーズ：1人3枚　／　第2フェーズ：1人2枚　／　第3フェーズ：1人2枚",
        "第1・第2調査フェーズの制限時間は、それぞれ5分間です。\nこの時間は、各キャラクターが館の中を歩き回り、探索している時間となります。\nそのため、全体での議論はできませんが、密談を行うことは可能です。\n取得されなかった調査カードは、次のフェーズに持ち越されます。",
        "【議論フェーズ】\n議論フェーズでは、全員で自由に話し合うことができます。\n調査で得た情報や、自分自身が知っている情報を共有しながら、事件の真相を探ってください。\nまた、議論中に密談を行うことも可能です。密談は1組2人、同時に2組までとします。",
        "第1議論フェーズ：20分間　／　第2議論フェーズ：20分間\nなお、第3フェーズのみ、調査と議論を分けず、30分間自由に行うことができます。",
        "【カードの譲渡・交換】\n取得した調査カードは、他のプレイヤーに見せたり、譲渡したり、交換したりすることができます。\nこれらはフェーズに関係なく、いつでも行うことが可能です。",
        "【特殊カード】\nゲーム中には、特定の条件を満たすことで取得できる特殊カードが存在します。\n条件を満たした場合は、その場でカードを取得することができます。\n特殊カードの取得に調査トークンは必要ありません。また、通常の調査カードの取得枚数にも含まれません。",
        "【告解フェーズ】\n第1フェーズと第2フェーズの最後には、告解の儀式を行います。\n皆さんには、それぞれ3枚の告解カードが配られます。\n告解の際には、その中から1枚を選んで提出してください。",
        "告解は全部で2回行われるため、3枚のうち2枚を使用することになります。\nどの情報を、どのタイミングで公開するかは、皆さん自身で判断してください。\n提出されたカードは、誰が提出したのかわからない状態で公開されます。",
        "告解カードに書かれている内容は、そのキャラクターが認識している真実です。\n本人の勘違いや思い込みが含まれている可能性はありますが、意図的な嘘はありません。",
        "告解は完全な秘匿のもとに行われる儀式です。提出時の動作や順番などから、提出者を特定することはできません。\nただし、公開された告解の内容については、通常の調査カードと同じように、自由に推理・議論することができます。\nまた、自分がその告解を行ったことを、後から自ら明かすことも可能です。\n告解フェーズは、カードの提出・公開・議論を含めて5分間です。",
        "【追加ハンドアウト】\n第2フェーズ終了後、10分間の休憩を取ります。\nこの時間に、各キャラクターに追加の設定書を配布します。\n追加設定書は、必ず一人で読んでください。\nまた、この時間中はトイレ休憩や密談を行うことも可能です。",
        "【クライマックスフェーズ】\nすべての調査・議論が終了した後、解答フェーズと投票フェーズを行います。\n解答フェーズでは、各自に与えられた質問に答えていただきます。\nその後、全員で犯人だと思う人物に投票を行います。\nクライマックスフェーズの詳しいルールについては、その時点で改めて説明します。",
        "それでは、各自の設定書をお読みください。\n準備が整い次第、ゲームを開始します。"
      ] },
    // 4. 第1フェーズ（2階）
    { type: "loop",   phase: "第1フェーズ", title: "イベント", bg: "p1_discuss", still: true, bgm: "idle", showTitle: true },
    { type: "timer",  phase: "第1フェーズ", title: "調査", minutes: 5,  bg: "p1_investigate", still: true, timerPos: "right", bgm: "idle" },
    { type: "timer",  phase: "第1フェーズ", title: "議論", minutes: 20, bg: "p1_discuss", still: true, bgm: "idle" },
    { type: "timer",  phase: "第1フェーズ", title: "告解", minutes: 5,  bg: "p1_discuss", still: true, bgm: "idle" },
    // 5. 第2フェーズ（1階）
    { type: "loop",   phase: "第2フェーズ", title: "イベント", bg: "p2_discuss", still: true, bgm: "idle", showTitle: true },
    { type: "timer",  phase: "第2フェーズ", title: "調査", minutes: 5,  bg: "p2_investigate", still: true, timerPos: "right", bgm: "idle" },
    { type: "timer",  phase: "第2フェーズ", title: "議論", minutes: 20, bg: "p2_discuss", still: true, bgm: "idle" },
    { type: "timer",  phase: "第2フェーズ", title: "告解", minutes: 5,  bg: "p2_discuss", still: true, bgm: "idle" },
    // 6. 第3フェーズ（地下）
    { type: "timer",  phase: "第3フェーズ", title: "イベント・休憩", minutes: 10, bg: "p3_discuss", still: true, timerPos: "top", bgm: "idle" },
    { type: "timer",  phase: "第3フェーズ", title: "調査＆最終議論", minutes: 30, bg: "p3_discuss", still: true, timerPos: "top", bgm: "idle" },
    // 7. クライマックスフェーズ
    { type: "loop",   title: "クライマックスフェーズ", bg: "p3_discuss", still: true, bgm: "idle", showTitle: true },
    // 8. エンディング
    { type: "ending", title: "エンディング" }
  ],


  stillBrightness: 1.35, // 作った背景（still: true の場面）の明るさ。1＝そのまま、大きいほど明るい
  speed: 14 // 1秒あたりに出る文字数（コントロール画面で変更できます）
};
