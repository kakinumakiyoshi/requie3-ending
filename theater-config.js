// ============================================================
//  上映モードの設定ファイル
//  映像やBGMを本番用に差し替えるときは、media フォルダの同じ名前のファイルを
//  置き換えるか、下のパスを書き換えてください。
// ============================================================
window.THEATER_CONFIG = {
  // 映像ファイル（mp4推奨）
  videos: {
    op: "media/op.mp4",                       // オープニング
    idle: "media/idle_loop.mp4",              // 待機・ゲーム中の背景（ループ再生）
    jonah_lights: "media/jonah_lights.mp4",   // ジョナEND：館に明かりが灯る
    legion_missile: "media/legion_missile.mp4" // レギオンEND：館にミサイル
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
    { seg: "^MAIN_A_JOHN_COOK_END$", at: "一斉に全ての電灯が灯り", video: "jonah_lights" },
    { seg: "^MAIN_B_.*（その後）$", at: "start", video: "legion_missile" }
  ],

  speed: 14 // 1秒あたりに出る文字数（コントロール画面で変更できます）
};
