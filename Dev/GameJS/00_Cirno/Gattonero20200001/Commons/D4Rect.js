/*
	D4Rect_t �^
*/

/@(ASTR)

/// D4Rect_t
{
	<double> L
	<double> T
	<double> W
	<double> H
}

@(ASTR)/

/*
	{ ������W, ��, ���� } �����`�̈�𐶐�����B
*/
function <D4Rect_t> CreateD4Rect(<double> l, <double> t, <double> w, <double> h)
{
	var ret =
	{
		L: l,
		T: t,
		W: w,
		H: h,
	};

	return ret;
}

/*
	{ ������W, �E�����W } �����`�̈�𐶐�����B
*/
function <D4Rect_t> CreateD4Rect_LTRB(<double> l, <double> t, <double> r, <double> b)
{
	return CreateD4Rect(l, t, r - l, b - t);
}

/*
	{ ���S���W, ��, ���� } �����`�̈�𐶐�����B
*/
function <D4Rect_t> CreateD4Rect_XYWH(<double> x, <double> y, <double> w, <double> h)
{
	return CreateD4Rect(x - w / 2, y - h / 2, w, h);
}

function <I4Rect_t> D4RectToI4Rect(<D4Rect_t> src)
{
	return CreateI4Rect(ToInt(src.L), ToInt(src.T), ToInt(src.W), ToInt(src.H));
}
