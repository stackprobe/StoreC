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

// ====
// �w�i�摜��������
// ====

// P_Bg_XXX [ Jikantai_e ]

var<Picture_t[]> P_Bg_PC�� =
[
	@@_Load(RESOURCE_�w�i__PC��a_jpg),
	@@_Load(RESOURCE_�w�i__PC��b_jpg),
	@@_Load(RESOURCE_�w�i__PC��c_jpg),
	@@_Load(RESOURCE_�w�i__PC��d_jpg),
];

var<Picture_t[]> P_Bg_�L�� =
[
	@@_Load(RESOURCE_�w�i__�L��a_jpg),
	@@_Load(RESOURCE_�w�i__�L��b_jpg),
	@@_Load(RESOURCE_�w�i__�L��c_jpg),
	@@_Load(RESOURCE_�w�i__�L��d_jpg),
];

var<Picture_t[]> P_Bg_����L =
[
	@@_Load(RESOURCE_�w�i__����La_jpg),
	@@_Load(RESOURCE_�w�i__����Lb_jpg),
	@@_Load(RESOURCE_�w�i__����Lc_jpg),
	@@_Load(RESOURCE_�w�i__����Ld_jpg),
];

var<Picture_t[]> P_Bg_����M =
[
	@@_Load(RESOURCE_�w�i__����Ma_jpg),
	@@_Load(RESOURCE_�w�i__����Mb_jpg),
	@@_Load(RESOURCE_�w�i__����Mc_jpg),
	@@_Load(RESOURCE_�w�i__����Md_jpg),
];

var<Picture_t[]> P_Bg_����R =
[
	@@_Load(RESOURCE_�w�i__����Ra_jpg),
	@@_Load(RESOURCE_�w�i__����Rb_jpg),
	@@_Load(RESOURCE_�w�i__����Rc_jpg),
	@@_Load(RESOURCE_�w�i__����Rd_jpg),
];

var<Picture_t[]> P_Bg_������ =
[
	@@_Load(RESOURCE_�w�i__������a_jpg),
	@@_Load(RESOURCE_�w�i__������b_jpg),
	@@_Load(RESOURCE_�w�i__������c_jpg),
	@@_Load(RESOURCE_�w�i__������d_jpg),
];

var<Picture_t[]> P_Bg_�Z�ɗ� =
[
	@@_Load(RESOURCE_�w�i__�Z�ɗ�a_jpg),
	@@_Load(RESOURCE_�w�i__�Z�ɗ�b_jpg),
	@@_Load(RESOURCE_�w�i__�Z�ɗ�c_jpg),
	@@_Load(RESOURCE_�w�i__�Z�ɗ�d_jpg),
];

var<Picture_t[]> P_Bg_�Z�� =
[
	@@_Load(RESOURCE_�w�i__�Z��a_jpg),
	@@_Load(RESOURCE_�w�i__�Z��b_jpg),
	@@_Load(RESOURCE_�w�i__�Z��c_jpg),
	@@_Load(RESOURCE_�w�i__�Z��d_jpg),
];

var<Picture_t[]> P_Bg_���� =
[
	@@_Load(RESOURCE_�w�i__����a_jpg),
	@@_Load(RESOURCE_�w�i__����b_jpg),
	@@_Load(RESOURCE_�w�i__����c_jpg),
	@@_Load(RESOURCE_�w�i__����d_jpg),
];

var<Picture_t[]> P_Bg_�K�i =
[
	@@_Load(RESOURCE_�w�i__�K�ia_jpg),
	@@_Load(RESOURCE_�w�i__�K�ib_jpg),
	@@_Load(RESOURCE_�w�i__�K�ic_jpg),
	@@_Load(RESOURCE_�w�i__�K�id_jpg),
];

var<Picture_t[]> P_Bg_�K�i�� =
[
	@@_Load(RESOURCE_�w�i__�K�i��a_jpg),
	@@_Load(RESOURCE_�w�i__�K�i��b_jpg),
	@@_Load(RESOURCE_�w�i__�K�i��c_jpg),
	@@_Load(RESOURCE_�w�i__�K�i��d_jpg),
];

// ====
// �w�i�摜�����܂�
// ====
