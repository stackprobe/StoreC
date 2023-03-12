/*
	I4Color_t �^
*/

/@(ASTR)

// �A���t�@�l���܂ސF��\���B
// �e�F�� 0 �` 255 ��z�肷��B
// R �� -1 �ɂ��邱�Ƃɂ���Ė����ȐF�������B

/// I4Color_t
{
	<int> R // -1 == ����
	<int> G
	<int> B
	<int> A
}

@(ASTR)/

function <I4Color_t> CreateI4Color(<int> r, <int> g, <int> b, <int> a)
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

function <D4Color_t> I4ColorToD4Color(<I4Color_t> src)
{
	return CreateD3Color(
		src.R / 255.0,
		src.G / 255.0,
		src.B / 255.0,
		src.A / 255.0
		);
}

function <I4Color_t> I4ColorToI3Color(<I4Color_t> src)
{
	return CreateI3Color(
		src.R,
		src.G,
		src.B
		);
}

function <string> I4ColorToString(<I4Color_t> src)
{
	var ret = "";
	ret += "#";
	ret += ZPad(ToHex(src.R), 2, "0");
	ret += ZPad(ToHex(src.G), 2, "0");
	ret += ZPad(ToHex(src.B), 2, "0");
	ret += ZPad(ToHex(src.A), 2, "0");

	return ret;
}
