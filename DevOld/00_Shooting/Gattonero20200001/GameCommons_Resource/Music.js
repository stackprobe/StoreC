/*
	���y
*/

function <Sound_t> @@_Load(<string> url)
{
	return LoadSound(url);
}

// ��������e�퉹�y

// �v���t�B�N�X
// M_ ... ���y

//var<Sound_t> M_���� = @@_Load(RESOURCE_General__muon_mp3); // �f�J���̂Ń��[�h���Ȃ��B

// �������܂ŌŒ� -- �������_���� -- �T���v���Ƃ��ăL�[�v

var<Sound_t> M_Title = @@_Load(RESOURCE_DovaSyndrome__Hanabi_mp3);
var<Sound_t> M_Ending      = @@_Load(RESOURCE_HMIX__n118_mp3);
var<Sound_t> M_Stage01     = @@_Load(RESOURCE_HMIX__n138_mp3);
var<Sound_t> M_Stage02     = @@_Load(RESOURCE_HMIX__n70_mp3);
var<Sound_t> M_Stage03     = @@_Load(RESOURCE_HMIX__n13_mp3);
var<Sound_t> M_Stage01Boss = @@_Load(RESOURCE_���[�t���J__Battle_Vampire_loop_m4a);
var<Sound_t> M_Stage02Boss = @@_Load(RESOURCE_���[�t���J__Battle_Conflict_loop_m4a);
var<Sound_t> M_Stage03Boss = @@_Load(RESOURCE_���[�t���J__Battle_rapier_loop_m4a);
