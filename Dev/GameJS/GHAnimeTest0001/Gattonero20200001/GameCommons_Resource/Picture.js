/*
	画像
*/

function <Picture_t> @@_Load(<string> url)
{
	return LoadPicture(url);
}

// ここから各種画像

// プリフィクス
// P_ ... 画像

var<Picture_t> P_Dummy = @@_Load(RESOURCE_General__Dummy_png);
var<Picture_t> P_WhiteBox = @@_Load(RESOURCE_General__WhiteBox_png);
var<Picture_t> P_WhiteCircle = @@_Load(RESOURCE_General__WhiteCircle_png);

// ★ここまで固定 -- 持ち回り_共通 -- サンプルとしてキープ

var<Picture_t> P_GameStartButton = @@_Load(RESOURCE_Picture__GameStartButton_png);
var<Picture_t> P_ExplodePiece = @@_Load(RESOURCE_Picture__光る星20_png);

var<Picture_t> P_TrumpBack = @@_Load(RESOURCE_Trump__Back01_png);
var<Picture_t> P_TrumpFrame = @@_Load(RESOURCE_Trump__Frame_png);
var<Picture_t> P_TrumpJoker = @@_Load(RESOURCE_Trump__Joker_png);

var<Picture_t> P_Face_01      = @@_Load(RESOURCE_Picture__Game__0001_png);
var<Picture_t> P_Face_02_Back = @@_Load(RESOURCE_Picture__Game__0003_png);
var<Picture_t> P_Face_02_Fore = @@_Load(RESOURCE_Picture__Game__0006_png);
var<Picture_t> P_Chinko       = @@_Load(RESOURCE_Picture__Game__0002_png);
