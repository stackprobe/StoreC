/*
	���ʉ�
*/

function <SE_t> @@_Load(<string> url)
{
	return LoadSE(url);
}

// ��������e����ʉ�

// �v���t�B�N�X
// S_ ... ���ʉ�

//var<SE_t> S_���� = @@_Load(RESOURCE_General__muon_mp3); // �f�J���̂Ń��[�h���Ȃ��B

// �������܂ŌŒ� -- �������_���� -- �T���v���Ƃ��ăL�[�v

var S_Start   = @@_Load(RESOURCE_���X��__coin05_mp3);
var S_YouWin  = @@_Load(RESOURCE_���X��__crrect_answer3_mp3);
var S_YouLose = @@_Load(RESOURCE_���X��__powerdown07_mp3);
var S_Pong    = @@_Load(RESOURCE_���X��__crrect_answer1_mp3);
var S_Chow    = @@_Load(RESOURCE_���X��__Budda_small_bell_mp3);
var S_Kong    = @@_Load(RESOURCE_���X��__Budda_large_bell_mp3);
var S_Dooooon = @@_Load(RESOURCE_���X��__game_explosion5_mp3);
