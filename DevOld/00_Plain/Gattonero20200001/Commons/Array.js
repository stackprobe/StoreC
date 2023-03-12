/*
	�z��
*/

function <int> IndexOf(<T[]> arr, <Func T boolean> match)
{
	for (var<int> i = 0; i < arr.length; i++)
	{
		if (match(arr[i]))
		{
			return i;
		}
	}
	return -1; // not found
}

function <void> InsertElement(<T[]> arr, <int> index, <T> element)
{
	if (index < 0 || arr.length < index)
	{
		error;
	}
	arr.push(-1);

	for (var<int> i = arr.length - 1; index < i; i--)
	{
		arr[i] = arr[i - 1];
	}
	arr[index] = element;
}

function <void> AddElement(<T[]> arr, <T> element)
{
	InsertElement(arr, arr.length, element);
}

function <void> AddElements(<T[]> arr, <T[]> elements)
{
	for (var<T> element of elements)
	{
		AddElement(arr, element);
	}
}

function <T> DesertElement(<T[]> arr, <int> index)
{
	if (index < 0 || arr.length <= index)
	{
		error;
	}
	var ret = arr[index];

	for (var<int> i = index; i < arr.length - 1; i++)
	{
		arr[i] = arr[i + 1];
	}
	arr.pop();
	return ret;
}

function <T> FastDesertElement(<T[]> arr, <int> index)
{
	if (index < 0 || arr.length <= index)
	{
		error;
	}
	var ret = arr[index];
	arr[index] = arr[arr.length - 1];
	arr.pop();
	return ret;
}

function <T> UnaddElement(<T[]> arr)
{
	return DesertElement(arr, arr.length - 1);
}

function <void> SwapElement(<T[]> arr, <int> index_A, <int> index_B)
{
	var<T> tmp = arr[index_A];
	arr[index_A] = arr[index_B];
	arr[index_B] = tmp;
}

function <void> Shuffle(<T[]> arr)
{
	for (var<int> i = arr.length; 2 <= i; i--)
	{
		SwapElement(arr, GetRand(i), i - 1);
	}
}

/*
	�����z��𓾂�B

	arr: �z��
	offset: �J�n�ʒu
	count: ����

	ret: �����z��
*/
function <T[]> GetSubArray(<T[]> arr, <int> offset, <int> count)
{
	if (offset < 0 || arr.length < offset)
	{
		error;
	}
	if (count < 0 || arr.length - offset < count)
	{
		error;
	}
	var dest = [];

	for (var<int> index = 0; index < count; index++)
	{
		dest.push(arr[offset + index]);
	}
	return dest;
}

/*
	�����z��𓾂�B

	arr: �z��
	offset: �J�n�ʒu

	ret: �����z��
*/
function <T[]> GetTrailArray(<T[]> arr, <int> offset)
{
	return GetSubArray(arr, offset, arr.length - offset);
}

/*
	�z��𕡐�����B

	arr: �z��

	ret: �z��̕���
*/
function <T[]> CloneArray(<T[]> arr)
{
	return GetTrailArray(arr, 0);
}

/*
	�}�b�`����v�f���폜����B

	arr: �z��
	match: ���胁�\�b�h
*/
function <void> RemoveAll(<T[]> arr, <Func T bool> match)
{
	var<int> w = 0;

	for (var<int> r = 0; r < arr.length; r++)
	{
		// �}�b�`���Ȃ���Δz��Ɏc���̂ŁAw �̎w���ʒu�֏������ށB
		if (!match(arr[r]))
		{
			arr[w] = arr[r];
			w++;
		}
	}
	while (w < arr.length)
	{
		arr.pop();
	}
}

/*
	�U�ƂȂ�v�f(false, null, undefined, 0, �󕶎���)���폜����B

	arr: �z��
*/
function <void> RemoveFalse(<T[]> arr)
{
	var match = function(token)
	{
		return !token;
	};

	RemoveAll(arr, match);
}

/*
	�z��̗v�f��S�č폜����B

	arr: �z��
*/
function <void> ClearArray(<T[]> arr)
{
	arr.length = 0;
}

/*
	�z��܂��̓W�F�l���[�^��z��ɕϊ�����B
*/
function <T[]> ToArray(<T[]> src)
{
	var<T[]> dest = [];

	for (var<T> element of src)
	{
		dest.push(element);
	}
	return dest;
}

/*
	�z��܂��̓W�F�l���[�^���W�F�l���[�^�ɕϊ�����B
*/
function* <T[]> ToGenerator(<T[]> src)
{
	for (var<T> element of src)
	{
		yield element;
	}
}

/*
	�W�F�l���[�^�̎��̒l���擾����B
*/
function <T> NextVal(generator)
{
	return generator.next().value;
}

/*
	�W�F�l���[�^�E�^�X�N�̎��̃t���[���������s����B
*/
function <void> NextRun(generator)
{
	if (!NextVal(generator))
	{
		error();
	}
}

function <T[]> Select(<T[]> arr, <Func T T> filter)
{
	return arr.map(v => filter(v));
}

function <T[]> Where(<T[]> arr, <Func T boolean> match)
{
	return arr.filter(v => match(v));
}
