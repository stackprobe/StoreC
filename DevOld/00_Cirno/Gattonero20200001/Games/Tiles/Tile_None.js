/*
	�^�C�� - ���
*/

var<int> TileKind_None = @(AUTO);

function <Tile_t> CreateTile_None()
{
	var ret =
	{
		Kind: TileKind_None,
		WallFlag: false,

		// ��������ŗL
	};

	ret.Draw = @@_Draw;

	return ret;
}

function <void> @@_Draw(<Tile_t> tile, <double> dx, <double> dy)
{
	// noop
}
