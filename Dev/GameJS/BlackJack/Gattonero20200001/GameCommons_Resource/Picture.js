/*
	�摜
*/

function <Picture_t> @@_Load(<string> url)
{
	return LoadPicture(url);
}

// ��������e��摜

// �v���t�B�N�X
// P_ ... �摜

var<Picture_t> P_Dummy = @@_Load(RESOURCE_General__Dummy_png);
var<Picture_t> P_WhiteBox = @@_Load(RESOURCE_General__WhiteBox_png);
var<Picture_t> P_WhiteCircle = @@_Load(RESOURCE_General__WhiteCircle_png);

// �������܂ŌŒ� -- �������_���� -- �T���v���Ƃ��ăL�[�v

var<Picture_t> P_GameStartButton = @@_Load(RESOURCE_Picture__GameStartButton_png);
var<Picture_t> P_ExplodePiece = @@_Load(RESOURCE_Picture__���鐯20_png);

/*
	�g�����v�̊G��
	�Y���F[�X�[�g (Suit_e) ][���� (1�`13) ]
*/
var<Picture_t[][]> P_Trump =
[
	null,

	// [1] �X�y�[�h
	[
		null,
		@@_Load(RESOURCE_Trump__s01_png),
		@@_Load(RESOURCE_Trump__s02_png),
		@@_Load(RESOURCE_Trump__s03_png),
		@@_Load(RESOURCE_Trump__s04_png),
		@@_Load(RESOURCE_Trump__s05_png),
		@@_Load(RESOURCE_Trump__s06_png),
		@@_Load(RESOURCE_Trump__s07_png),
		@@_Load(RESOURCE_Trump__s08_png),
		@@_Load(RESOURCE_Trump__s09_png),
		@@_Load(RESOURCE_Trump__s10_png),
		@@_Load(RESOURCE_Trump__s11_png),
		@@_Load(RESOURCE_Trump__s12_png),
		@@_Load(RESOURCE_Trump__s13_png),
	],

	// [2] �n�[�g
	[
		null,
		@@_Load(RESOURCE_Trump__h01_png),
		@@_Load(RESOURCE_Trump__h02_png),
		@@_Load(RESOURCE_Trump__h03_png),
		@@_Load(RESOURCE_Trump__h04_png),
		@@_Load(RESOURCE_Trump__h05_png),
		@@_Load(RESOURCE_Trump__h06_png),
		@@_Load(RESOURCE_Trump__h07_png),
		@@_Load(RESOURCE_Trump__h08_png),
		@@_Load(RESOURCE_Trump__h09_png),
		@@_Load(RESOURCE_Trump__h10_png),
		@@_Load(RESOURCE_Trump__h11_png),
		@@_Load(RESOURCE_Trump__h12_png),
		@@_Load(RESOURCE_Trump__h13_png),
	],

	// [3] �_�C��
	[
		null,
		@@_Load(RESOURCE_Trump__d01_png),
		@@_Load(RESOURCE_Trump__d02_png),
		@@_Load(RESOURCE_Trump__d03_png),
		@@_Load(RESOURCE_Trump__d04_png),
		@@_Load(RESOURCE_Trump__d05_png),
		@@_Load(RESOURCE_Trump__d06_png),
		@@_Load(RESOURCE_Trump__d07_png),
		@@_Load(RESOURCE_Trump__d08_png),
		@@_Load(RESOURCE_Trump__d09_png),
		@@_Load(RESOURCE_Trump__d10_png),
		@@_Load(RESOURCE_Trump__d11_png),
		@@_Load(RESOURCE_Trump__d12_png),
		@@_Load(RESOURCE_Trump__d13_png),
	],

	// [4] �N���u
	[
		null,
		@@_Load(RESOURCE_Trump__k01_png),
		@@_Load(RESOURCE_Trump__k02_png),
		@@_Load(RESOURCE_Trump__k03_png),
		@@_Load(RESOURCE_Trump__k04_png),
		@@_Load(RESOURCE_Trump__k05_png),
		@@_Load(RESOURCE_Trump__k06_png),
		@@_Load(RESOURCE_Trump__k07_png),
		@@_Load(RESOURCE_Trump__k08_png),
		@@_Load(RESOURCE_Trump__k09_png),
		@@_Load(RESOURCE_Trump__k10_png),
		@@_Load(RESOURCE_Trump__k11_png),
		@@_Load(RESOURCE_Trump__k12_png),
		@@_Load(RESOURCE_Trump__k13_png),
	],
];

var<Picture_t> P_TrumpFrame = @@_Load(RESOURCE_Trump__Frame_png);
var<Picture_t> P_TrumpBack  = @@_Load(RESOURCE_Trump__Back01_png);
var<Picture_t> P_TrumpJoker = @@_Load(RESOURCE_Trump__Joker_png);

var<Picture_t> P_ButtonBetUp    = @@_Load(RESOURCE_Picture__BetUp_png);
var<Picture_t> P_ButtonBetDown  = @@_Load(RESOURCE_Picture__BetDown_png);
var<Picture_t> P_ButtonStart    = @@_Load(RESOURCE_Picture__Start_png);
var<Picture_t> P_ButtonStand    = @@_Load(RESOURCE_Picture__Stand_png);
var<Picture_t> P_ButtonHit      = @@_Load(RESOURCE_Picture__Hit_png);
var<Picture_t> P_ButtonContinue = @@_Load(RESOURCE_Picture__Continue_png);
var<Picture_t> P_ButtonNext     = @@_Load(RESOURCE_Picture__Next_png);
var<Picture_t> P_ButtonX        = @@_Load(RESOURCE_Picture__XButton_png);

var<Picture_t> P_Bunny      = @@_Load(RESOURCE_Picture__bunny_top300_png);
var<Picture_t> P_Bunny_H_01 = @@_Load(RESOURCE_Picture__bunny_h_01_png);

var<Picture_t> P_BattleBackground = @@_Load(RESOURCE_�ς�����__Background_png);
