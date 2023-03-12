/*
	���ʁE���̑�
*/

function <Func boolean> Supplier(<generatorForTask> task)
{
	var ret = function <Func boolean> ()
	{
		return NextVal(task);
	};

	return ret;
}

function* <T[]> Repeat(<T> value, <int> count)
{
	for (var<int> index = 0; index < count; index++)
	{
		yield value;
	}
}

function* <generatorForTask> Wait(<int> count)
{
	yield* Repeat(1, count);
}

function <int> CountDown(<int> count)
{
	if (1 < count)
	{
		count--;
	}
	else if (count < -1)
	{
		count++;
	}
	else
	{
		count = 0;
	}

	return count;
}

function <boolean> IsOut(<D2Point_t> pt, <D4Rect_t> rect, <double> margin)
{
	var ret =
		pt.X < rect.L - margin || rect.L + rect.W + margin < pt.X ||
		pt.Y < rect.T - margin || rect.T + rect.H + margin < pt.Y;

	return ret;
}

function <boolean> IsOutOfScreen(<D2Point_t> pt, <double> margin)
{
	return IsOut(pt, CreateD4Rect(0.0, 0.0, Screen_W, Screen_H), margin);
}

function <boolean> IsOutOfCamera(<D2Point_t> pt, <double> margin)
{
	return IsOut(pt, CreateD4Rect(Camera.X, Camera.Y, Screen_W, Screen_H), margin);
}

/*
	�n�_����I�_�܂ł̊Ԃ̎w�背�[�g�̈ʒu��Ԃ��B

	a: �n�_
	b: �I�_
	rate: ���[�g

	ret: �ʒu
*/
function <double> AToBRate(<double> a, <double> b, <double> rate)
{
	return a + (b - a) * rate;
}

/*
	�n�_����I�_�܂ł̊Ԃ̈ʒu�����[�g�ɕϊ�����B

	a: �n�_
	b: �I�_
	value: �ʒu

	ret: ���[�g
*/
function <double> RateAToB(<double> a, <double> b, <double> value)
{
	return (value - a) / (b - a);
}

/*
	���W�A���p�̐��K��
*/
function <double> ToInRangeAngle(<double> angle)
{
	while (angle < 0.0)
	{
		angle += Math.PI * 2.0;
	}
	while (Math.PI * 2.0 < angle)
	{
		angle -= Math.PI * 2.0;
	}
	return angle;
}
