/*
	�`��
*/

// �摜�̕����擾����B
function <int> GetPicture_W(<Picture_t> picture)
{
	return picture.Handle.naturalWidth;
}

// �摜�̍������擾����B
function <int> GetPicture_H(<Picture_t> picture)
{
	return picture.Handle.naturalHeight;
}

// �X�N���[���̃N���A
function <void> ClearScreen()
{
	Context.clearRect(0, 0, Screen_W, Screen_H);
}

/*
	�`��

	x: �摜�̒��S�Ƃ��� X-���W
	y: �摜�̒��S�Ƃ��� Y-���W
	a: �s�����x (0.0 ���� �` 1.0 �s����)
	r: ��]
		0.0 == ��]����
		2*PI == ���v����1��]
		-2*PI == �����v����1��]
	z: �g�嗦
		1.0 == ���{
		2.0 == 2�{
		0.5 == 0.5�{
*/
function <void> Draw(<Picture_t> picture, <double> x, <double> y, <double> a, <double> r, <double> z)
{
	Draw2(picture, x, y, a, r, z, z);
}

function <void> Draw2(<Picture_t> picture, <double> x, <double> y, <double> a, <double> r, <double> zw, <double> zh)
{
	var<int> w = GetPicture_W(picture);
	var<int> h = GetPicture_H(picture);

	w *= zw;
	h *= zh;

	var<double> l = x - w / 2;
	var<double> t = y - h / 2;

	Context.translate(x, y);
	Context.rotate(r);
	Context.translate(-x, -y);
	Context.globalAlpha = a;

	Context.drawImage(picture.Handle, l, t, w, h);

	// restore
	Context.translate(x, y);
	Context.rotate(-r);
	Context.translate(-x, -y);
	Context.globalAlpha = 1.0;
}
