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

var<SE_t> S_Jump    = @@_Load(RESOURCE_���X��__jump12_mp3);
var<SE_t> S_Crashed = @@_Load(RESOURCE_���X��__question_mp3);
var<SE_t> S_Dead    = @@_Load(RESOURCE_���X��__explosion05_mp3);
var<SE_t> S_Clear   = @@_Load(RESOURCE_���X��__warp1_mp3);
var<SE_t> S_Shoot   = @@_Load(RESOURCE_�o���s��__PlayerShoot_mp3);
var<SE_t> S_Damaged = @@_Load(RESOURCE_���X��__damage5_mp3);
var<SE_t> S_EnemyDamaged = @@_Load(RESOURCE_�o���s��__EnemyDamaged_mp3);
var<SE_t> S_EnemyDead    = @@_Load(RESOURCE_���X��__explosion01_mp3);
var<SE_t> S_BossDead     = @@_Load(RESOURCE_���X��__game_explosion2_mp3);

// ----

var<SE_t[]> S_�e�X�g�p =
[
	S_Jump,
	S_Damaged,
	S_Dead,
];

var<SE_t> S_SaveDataRemoved = S_Dead;

// ----
