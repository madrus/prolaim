//<script src="http://api-maps.yandex.ru/2.0/?load=package.full&lang=ru-RU" type="text/javascript"></script>

ymaps.ready(init);

function init() {

    var myMap = new ymaps.Map("map", {
        center: [48.568388, 39.309111],
        zoom: 13
    });

    myMap.behaviors.enable('scrollZoom');

    myMap.controls
        // ������ ��������� ��������.
        .add('smallZoomControl');

    myPlacemark2 = new ymaps.Placemark([48.568388, 39.309111], {
        // ��������.
        iconContent: '1',
        balloonContent: '�����',
        hintContent: '����������� ������ �����'
    }, {
        // �����.
        // ��� ����������� ������ �����.
        iconImageHref: 'images/phone.png',
        // ������� �����.
        iconImageSize: [30, 30],
        // �������� ������ �������� ���� ������ ������������
        // � "�����" (����� ��������).
        iconImageOffset: [-15, -25]
    });

    myPlacemark3 = new ymaps.Placemark([48.566895, 39.316765], {
        // ��������.
        iconContent: '1',
        balloonContent: '�����',
        hintContent: '����������� ������ �����'
    }, {
        // �����.
        // ��� ����������� ������ �����.
        iconImageHref: 'images/phone.png',
        // ������� �����.
        iconImageSize: [30, 30],
        // �������� ������ �������� ���� ������ ������������
        // � "�����" (����� ��������).
        iconImageOffset: [-15, -25]
    });

    // ��������� ��� ����� �� �����.
    myMap.geoObjects
        .add(myPlacemark3)
        .add(myPlacemark2);
}

