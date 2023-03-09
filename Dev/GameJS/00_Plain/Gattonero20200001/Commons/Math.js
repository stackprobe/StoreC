/*
	���w�n
*/

/*
	ret: value ���l�̌ܓ�����������Ԃ��B
*/
function <int> ToInt(<double> value)
{
	return Math.round(value);
}

/*
	ret: value �̏�������؂�̂Ă�������Ԃ��B
		�܂�[�������ōŊ��̐�����Ԃ��B���g�������ł���Ύ��g��Ԃ��B
		��F
			2.4 -> 2
			-3.7 -> -3
			586.0 -> 586
*/
function <int> ToFix(<double> value)
{
	return Math.trunc(value);
}

/*
	ret: value �ȉ��ōő�̐�����Ԃ��B
		�܂�}�C�i�X����������ōŊ��̐�����Ԃ��B���g�������ł���Ύ��g��Ԃ��B
		��F
			2.4 -> 2
			-3.7 -> -4
			586.0 -> 586
*/
function <int> ToFloor(<double> value)
{
	return Math.floor(value);
}

/*
	value �� minval, maxval �͈̔͂ɋ�������B
*/
function <Number> ToRange(<Number> value, <Number> minval, <Number> maxval)
{
	return Math.min(Math.max(value, minval), maxval);
}

/*
	0 �` (modulo - 1) �̗�����Ԃ��B(int)
*/
function <int> GetRand(<int> modulo)
{
	return Math.floor(Math.random() * modulo);
}

/*
	minval �` maxval �̗�����Ԃ��B(int)
*/
function <int> GetRandRange(<int> minval, <int> maxval)
{
	return GetRand((maxval - minval) + 1) + minval;
}

/*
	-1 �܂��� 1 �������_���ɕԂ��B
*/
function <int> GetRandSign()
{
	return GetRand(2) * 2 - 1;
}

/*
	0.0 �` 1.0 �̗�����Ԃ��B(double)
*/
function <double> GetRand1()
{
	return GetRand(IMAX + 1) / IMAX;
}

/*
	-1.0 �` 1.0 �̗�����Ԃ��B(double)
*/
function <double> GetRand2()
{
	return GetRand1() * 2.0 - 1.0;
}

/*
	minval �` maxval �̗�����Ԃ��B(double)
*/
function <double> GetRand3(<double> minval, <double> maxval)
{
	return GetRand1() * (maxval - minval) + minval;
}

/*
	�z��̗v�f(1��)�������_���ŕԂ��B
*/
function <T> ChooseOne(<T[]> arr)
{
	return arr[GetRand(arr.length)];
}
