/*
	�ǎ�
*/

/@(ASTR)

/// Wall_t
{
	// �ǎ���`�悷��B
	//
	<generatorForTask> Draw
}

@(ASTR)/

/*
	�`��
*/
function <void> DrawWall(<Wall_t> wall)
{
	NextRun(wall.Draw);
}
