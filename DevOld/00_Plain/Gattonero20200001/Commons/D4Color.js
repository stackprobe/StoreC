/*
	D4Color_t �^
*/

/@(ASTR)

// �A���t�@�l���܂ސF�܂��͐F�̔䗦��\���B
// �e�F�� 0.0 �` 1.0 ��z�肷��B

/// D4Color_t
{
	<double> R
	<double> G
	<double> B
	<double> A
}

@(ASTR)/

function <D4Color_t> CreateD4Color(<double> r, <double> g, <double> b, <double> a)
{
	var ret =
	{
		R: r,
		G: g,
		B: b,
		A: a,
	};

	return ret;
}

function <I4Color_t> D4ColorToI4Color(<D4Color_t> src)
{
	return CreateI4Color(
		ToInt(src.R * 255.0),
		ToInt(src.G * 255.0),
		ToInt(src.B * 255.0),
		ToInt(src.A * 255.0)
		);
}

function <D3Color_t> D4ColorToD3Color(<D4Color_t> src)
{
	return CreateD3Color(
		src.R,
		src.G,
		src.B,
		);
}
