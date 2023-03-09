/*
	�Q�[���������ʊ֐�
*/

/*
	�n�_�E�I�_�E���x���� XY-���x�𓾂�B

	x: X-�n�_
	y: Y-�n�_
	targetX: X-�I�_
	targetY: Y-�I�_
	speed: ���x

	ret:
	{
		X: X-���x
		Y: Y-���x
	}
*/
function <D2Point_t> MakeXYSpeed(<double> x, <double> y, <double> targetX, <double> targetY, <double> speed)
{
	return AngleToPoint(GetAngle(targetX - x, targetY - y), speed);
}

/*
	���_���猩�Ďw��ʒu�̊p�x�𓾂�B
	�p�x�� X-���v���X������ 0 �x�Ƃ��Ď��v���̃��W�A���p�ł��B
	�A�� X-���v���X�����͉E Y-���v���X�����͉��ł��B
	�Ⴆ�΁A�^���� Math.PI / 2, �^��� Math.PI * 1.5 �ɂȂ�܂��B

	x: X-�w��ʒu
	y: Y-�w��ʒu

	ret: �p�x
*/
function <double> GetAngle(<double> x, <double> y)
{
	if (y < 0.0)
	{
		return Math.PI * 2.0 - GetAngle(x, -y);
	}
	if (x < 0.0)
	{
		return Math.PI - GetAngle(-x, y);
	}
	if (x < y)
	{
		return Math.PI / 2.0 - GetAngle(y, x);
	}
	if (x < MICRO)
	{
		return 0.0; // �ɒ[�Ɍ��_�ɋ߂����W�̏ꍇ�A��ɉE�^����Ԃ��B
	}
	if (y == 0.0)
	{
		return 0.0;
	}
	if (y == x)
	{
		return Math.PI / 4.0;
	}

	var<double> r1 = 0.0;
	var<double> r2 = Math.PI / 4.0;
	var<double> t = y / x;
	var<double> rm;
	var<double> rmt;

	for (var<int> c = 1; ; c++)
	{
		rm = (r1 + r2) / 2.0;

		if (10 <= c)
		{
			break;
		}

		rmt = Math.tan(rm);

		if (t < rmt)
		{
			r2 = rm;
		}
		else
		{
			r1 = rm;
		}
	}
	return rm;
}

/*
	�p�x�Ƌ��������Ɍ��_���猩���ʒu�𓾂�B

	angle: �p�x
	distance: ����

	ret:
	{
		X: X-�ʒu
		Y: Y-�ʒu
	}
*/
function <D2Point_t> AngleToPoint(<double> angle, <double> distance)
{
	var<D2Point_t> ret =
	{
		X: distance * Math.cos(angle),
		Y: distance * Math.sin(angle),
	};

	return ret;
}

/*
	���_����w��ʒu�܂ł̋����𓾂�B

	x: X-�w��ʒu
	y: Y-�w��ʒu

	ret: ����
*/
function <double> GetDistance(<double> x, <double> y)
{
	return Math.sqrt(x * x + y * y);
}

/*
	���_����w��ʒu�܂ł̋������w�苗�������ł��邩���肷��B

	x: X-�w��ʒu
	y: Y-�w��ʒu
	r: �w�苗��

	ret: ���_����w��ʒu�܂ł̋������w�苗�������ł��邩
*/
function <boolean> GetDistanceLessThan(<double> x, <double> y, <double> r)
{
	return GetDistance(x, y) < r;
//	return x * x + y * y < r * r;
}

/*
	���ݒl��ړI�l�ɋ߂Â��܂��B

	value: ���ݒl
	dest: �ړI�l
	rate: 0.0 �` 1.0 (�߂�����߂Â��� �` ����܂�߂Â��Ȃ�)

	ret: �߂Â�����̒l
*/
function <double> Approach(<double> value, <double> dest, <double> rate)
{
	value -= dest;
	value *= rate;
	value += dest;

	return value;
}

/*
	�� forscene, DDSceneUtils.Create() �Ɠ��l�̂���

	�g�p��F
		for (var scene of CreateScene(30))
		{
			// �����փt���[�����̏������L�q����B

			yield 1;
		}

		�񋓉񐔁F31
		�񋓁F
			{ Numer: 0, Denom: 30, Rem: 30, Rate: 0.0,    RemRate: 1.0     }
			{ Numer: 1, Denom: 30, Rem: 29, Rate: 1 / 30, RemRate: 29 / 30 }
			{ Numer: 2, Denom: 30, Rem: 28, Rate: 2 / 30, RemRate: 28 / 30 }
			...
			{ Numer: 28, Denom: 30, Rem: 2, Rate: 28 / 30, RemRate: 2 / 30 }
			{ Numer: 29, Denom: 30, Rem: 1, Rate: 29 / 30, RemRate: 1 / 30 }
			{ Numer: 30, Denom: 30, Rem: 0, Rate: 1.0,     RemRate: 0.0    }
*/
function* <Scene_t[]> CreateScene(<int> frameMax)
{
	for (var<int> frame = 0; frame <= frameMax; frame++)
	{
		var<double> rate = frame / frameMax;

		/// Scene_t
		var<Scene_t> scene =
		{
			<int> Numer: frame,
			<int> Denom: frameMax,
			<double> Rate: rate,
			<int> Rem: frameMax - frame,
			<double> RemRate: 1.0 - rate,
		};

		yield scene;
	}
}

var<D4Rect_t> @@_Interior = null;
var<D4Rect_t> @@_Exterior = null;

function <void> @@_AdjustRect(<D2Size_t> size, <D4Rect_t> rect)
{
	var<double> w_h = (rect.H * size.W) / size.H; // ��������ɂ�����
	var<double> h_w = (rect.W * size.H) / size.W; // ������ɂ�������

	var<D4Rect_t> rect1 = {};
	var<D4Rect_t> rect2 = {};

	rect1.L = rect.L + (rect.W - w_h) / 2.0;
	rect1.T = rect.T;
	rect1.W = w_h;
	rect1.H = rect.H;

	rect2.L = rect.L;
	rect2.T = rect.T + (rect.H - h_w) / 2.0;
	rect2.W = rect.W;
	rect2.H = h_w;

	if (w_h < rect.W)
	{
		@@_Interior = rect1;
		@@_Exterior = rect2;
	}
	else
	{
		@@_Interior = rect2;
		@@_Exterior = rect1;
	}
}

/*
	�T�C�Y��(�A�X�y�N�g����ێ�����)��`�̈悢���ς��ɍL����B
	��`�̈�̓����ɒ���t���̈��Ԃ��B
*/
function <D4Rect_t> AdjustRectInterior(<D2Size_t> size, <D4Rect_t> rect)
{
	@@_AdjustRect(size, rect);

	return @@_Interior;
}

/*
	�T�C�Y��(�A�X�y�N�g����ێ�����)��`�̈悢���ς��ɍL����B
	��`�̈�̊O���ɒ���t���̈��Ԃ��B
*/
function <D4Rect_t> AdjustRectExterior(<D2Size_t> size, <D4Rect_t> rect)
{
	@@_AdjustRect(size, rect);

	return @@_Exterior;
}

/*
	�T�C�Y��(�A�X�y�N�g����ێ�����)��`�̈悢���ς��ɍL����B
	��`�̈�̊O���ɒ���t���̈��Ԃ��B

	size: �T�C�Y
	rect: ��`�̈�(����)
	xRate: �X���C�h���[�g 0.0 �` 1.0
		0.0 == ��`�̈�(�o��)�����Ɋ񂹂� == ��`�̈�(����)�Ƌ�`�̈�(�o��)�̉E�����d�Ȃ�B
		0.5 == ����
		1.0 == ��`�̈�(�o��)���E�Ɋ񂹂� == ��`�̈�(����)�Ƌ�`�̈�(�o��)�̍������d�Ȃ�B
	yRate: �X���C�h���[�g 0.0 �` 1.0
		0.0 == ��`�̈�(�o��)����Ɋ񂹂� == ��`�̈�(����)�Ƌ�`�̈�(�o��)�̉������d�Ȃ�B
		0.5 == ����
		1.0 == ��`�̈�(�o��)�����Ɋ񂹂� == ��`�̈�(����)�Ƌ�`�̈�(�o��)�̏㑤���d�Ȃ�B
	extraZoom: �{�� 1.0 �`

	ret: ��`�̈�(�o��)
*/
function <D4Rect_t> AdjustRectExterior_RRZ(<D2Size_t> size, <D4Rect_t> rect, <double> xRate, <double> yRate, <double> extraZoom)
{
	var<D4Rect_t> exterior = AdjustRectExterior(size, rect);

	exterior.W *= extraZoom;
	exterior.H *= extraZoom;

	var<double> rangeX = exterior.W - rect.W;
	var<double> rangeY = exterior.H - rect.H;

	exterior.L = rect.L + rangeX * (xRate - 1.0);
	exterior.T = rect.T + rangeY * (yRate - 1.0);

	return exterior;
}

/*
	�e���L�[�������E���x���� XY-���x�𓾂�B

	direction: 8����_�e���L�[���� (1�`4, 6�`9)
	speed: ���x

	ret: XY-���x
*/
function <D2Point_t> GetXYSpeed(<int> direction, <double> speed)
{
	var<double> nanameSpeed = speed / Math.SQRT2;
	var<D2Point_t> ret;

	switch (direction)
	{
	case 4: ret = CreateD2Point(-speed, 0.0); break;
	case 6: ret = CreateD2Point( speed, 0.0); break;
	case 8: ret = CreateD2Point(0.0, -speed); break;
	case 2: ret = CreateD2Point(0.0,  speed); break;

	case 1: ret = CreateD2Point(-nanameSpeed,  nanameSpeed); break;
	case 3: ret = CreateD2Point( nanameSpeed,  nanameSpeed); break;
	case 7: ret = CreateD2Point(-nanameSpeed, -nanameSpeed); break;
	case 9: ret = CreateD2Point( nanameSpeed, -nanameSpeed); break;

	default:
		error(); // never
	}
	return ret;
}
