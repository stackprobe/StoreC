/*
	����(�X�e�[�W)�I�����j���[
*/

function* <generatorForTask> GameProgressMaster()
{
	do
	{
		yield* GameMain();
	}
	while (GameEndReason == GameEndReason_e_RESTART_GAME);
}
