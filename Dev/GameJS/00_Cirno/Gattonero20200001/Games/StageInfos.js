/*
	�X�e�[�W���

	�e���X�g���� (GetMapCount() + 1) �ł��邱�ƁB

	[0] == �e�X�g�p
	[1] == �X�e�[�W_01
	[2] == �X�e�[�W_02
	[3] == �X�e�[�W_03
	...
	[n] == �X�e�[�W_n
*/

var<Sound_t[]> @@_MusicList =
[
	M_Field,
	M_Field,
	M_Field,
	M_Boss,
	M_Field,
	M_Field,
	M_Field,
	M_Field,
	M_Field,
	M_Field,
];

function <void> PlayStageMusic(<int> mapIndex)
{
	Play(@@_MusicList[mapIndex]);
}

var<Func Wall_t> @@_WallCreatorList =
[
	() => CreateWall_Simple(P_Wall0001),
	() => CreateWall_Simple(P_Wall0001),
	() => CreateWall_Simple(P_Wall0002),
	() => CreateWall_Simple(P_Wall0003),
	() => CreateWall_Simple(P_Wall0001),
	() => CreateWall_Simple(P_Wall0002),
	() => CreateWall_Simple(P_Wall0001),
	() => CreateWall_Simple(P_Wall0002),
	() => CreateWall_Simple(P_Wall0001),
	() => CreateWall_Simple(P_Wall0002),
];

function <Wall_t> GetStageWall(<int> mapIndex)
{
	return @@_WallCreatorList[mapIndex]();
}
