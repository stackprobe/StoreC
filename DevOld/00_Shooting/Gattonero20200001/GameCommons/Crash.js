/*
	�����蔻��
*/

/@(ASTR)

/// Crash_t
{
	// �����蔻��̎��
	// 1 == �~�`(�_)
	// 2 == ��`
	//
	<int> Kind
}

@(ASTR)/

// �����蔻��𐶐� -- �_
function <Crash_t> CreateCrash_Point(<double> x, <double> y)
{
	return CreateCrash_Circle(x, y, MICRO);
}

// �����蔻��𐶐� -- �~�`
function <Crash_t> CreateCrash_Circle(<double> x, <double> y, <double> r)
{
	var ret =
	{
		Kind: 1,

		// ��������ŗL

		<double> X: x, // ���S�� X-���W
		<double> Y: y, // ���S�� Y-���W
		<double> R: r, // ���a
	};

	return ret;
}

// �����蔻��𐶐� -- ��`
function <Crash_t> CreateCrash_Rect(<D4Rect_t> rect)
{
	var ret =
	{
		Kind: 2,

		// ��������ŗL

		<D4Rect_t> Rect: rect, // �̈�
	};

	return ret;
}

function <boolean> IsCrashed(<Crash_t> a, <Crash_t> b)
{
	/*
		Enemy_t.Crash, Shot_t.Crash ���ݒ肳�ꂸ�ɓ����蔻��ɓ˓�����ꍇ��z�肵�āB
		�����蔻�薳���̏ꍇ Crash �� null �̂܂܁B
	*/
	if (a == null || b == null)
	{
		return false;
	}

	if (b.Kind < a.Kind)
	{
		var tmp = a;
		a = b;
		b = tmp;
	}

	// ���̎��_�� a.Kind <= b.Kind �ƂȂ��Ă���B

	if (a.Kind == 1 && b.Kind == 1) // ? �~�` vs �~�`
	{
		return GetDistanceLessThan(a.X - b.X, a.Y - b.Y, a.R + b.R);
	}
	if (a.Kind == 1 && b.Kind == 2) // ? �~�` vs ��`
	{
		var<double> x = a.X;
		var<double> y = a.Y;
		var<double> rad = a.R;

		var<double> l2 = b.Rect.L;
		var<double> t2 = b.Rect.T;
		var<double> r2 = b.Rect.L + b.Rect.W;
		var<double> b2 = b.Rect.T + b.Rect.H;

		if (x < l2) // ��
		{
			if (y < t2) // ����
			{
				return @@_IsCrashed_Circle_Point(x, y, rad, l2, t2);
			}
			else if (b2 < y) // ����
			{
				return @@_IsCrashed_Circle_Point(x, y, rad, l2, b2);
			}
			else // �����i
			{
				return l2 < x + rad;
			}
		}
		else if (r2 < x) // �E
		{
			if (y < t2) // �E��
			{
				return @@_IsCrashed_Circle_Point(x, y, rad, r2, t2);
			}
			else if (b2 < y) // �E��
			{
				return @@_IsCrashed_Circle_Point(x, y, rad, r2, b2);
			}
			else // �E���i
			{
				return x - rad < r2;
			}
		}
		else // �^��E�^�񒆁E�^��
		{
			return t2 - rad < y && y < b2 + rad;
		}
	}
	if (a.Kind == 2 && b.Kind == 2) // ? ��` vs ��`
	{
		var<double> l1 = a.Rect.L;
		var<double> t1 = a.Rect.T;
		var<double> r1 = a.Rect.L + a.Rect.W;
		var<double> b1 = a.Rect.T + a.Rect.H;

		var<double> l2 = b.Rect.L;
		var<double> t2 = b.Rect.T;
		var<double> r2 = b.Rect.L + b.Rect.W;
		var<double> b2 = b.Rect.T + b.Rect.H;

		return l1 < r2 && l2 < r1 && t1 < b2 && t2 < b1;
	}
	error(); // �s���ȑg�ݍ��킹
}

function <boolean> @@_IsCrashed_Circle_Point(<double> x, <double> y, <double> rad, <double> x2, <double> y2)
{
	return GetDistanceLessThan(x - x2, y - y2, rad);
}

/*
	�����蔻��̕`�� (�f�o�b�O�p)
	�Ăяo���O�� SetColor ���Z�b�g���邱�ƁB
*/
function <void> DrawCrash(<Crash_t> crash)
{
	if (crash == null) // ? �����蔻�薳��
	{
		// noop
	}
	else if (crash.Kind == 1) // ? �~�`
	{
		PrintCircle(crash.X - Camera.X, crash.Y - Camera.Y, Math.max(3.0, crash.R));
	}
	else if (crash.Kind == 2) // ? ��`
	{
		PrintRect(crash.Rect.L - Camera.X, crash.Rect.T - Camera.Y, crash.Rect.W, crash.Rect.H);
	}
	else
	{
		error(); // �s���Ȏ��
	}
}
