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

var<SE_t[]> S_�e�X�g�p =
[
	@@_Load(RESOURCE_General__muon_mp3),
	@@_Load(RESOURCE_General__muon_mp3),
	@@_Load(RESOURCE_General__muon_mp3),
];

var<SE_t> S_SaveDataRemoved = @@_Load(RESOURCE_General__muon_mp3);
