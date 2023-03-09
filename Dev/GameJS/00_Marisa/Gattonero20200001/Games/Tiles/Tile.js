/*
	�^�C��
*/

/// TileMode_e
//
var<int> TileMode_e_SPACE = @(AUTO); // ���
var<int> TileMode_e_WATER = @(AUTO); // ����
var<int> TileMode_e_WALL  = @(AUTO); // ��

/@(ASTR)

/// Tile_t
{
	<int> Kind // �^�C���̎��
	<TileMode_e> TileMode // �^�C���̐U�镑��
	<Action Tile_t double double> Draw // �`��
}

@(ASTR)/

/*
	�`��

	(dx, dy): �`��ʒu(�J�����ʒu�K�p�ς�)
*/
function <void> DrawTile(<Tile_t> tile, <double> dx, <double> dy)
{
	return tile.Draw(tile, dx, dy);
}
