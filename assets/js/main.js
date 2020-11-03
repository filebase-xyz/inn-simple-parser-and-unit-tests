
    /*
    
        В соответствии с https://uk.wikipedia.org/wiki/Реєстраційний_номер_облікової_картки_платника_податків

    */

    function parseINN(inn){

        inn = inn
                .toString() // Преобразование в строку, на случай если код был передан числом.
                .replaceAll(' ', '') // Очистка от пробелов (не лучший вариант).
                .split('')
                .map(i => +i) // Преобразуем все цифры из строк в числа.
                .filter(item => !isNaN(item)); // Все НЕ цифры после преобразования станут NaN'ами, и тут мы их фильтруем. Т.е. если пользователь введёт случайно буквы, мы очистим от них введённую строку. 

        let coefficients = [-1, 5, 7, 9, 4, 6, 10, 5, 7]; // Коэфициенты. 

        let controlSum = coefficients.reduce( (acc, item, i) => acc + item * inn[i], 0); // Находим контрольную сумму, перемножая соответствующие элементы массива с цифрами ИНН'а и коэфициентами, и суммируем полученные произведения. 
        // В соответствии с Х = А*(-1) + Б*5 + В*7 + Г*9 + Ґ*4 + Д*6 + Е*10 + Є*5 + Ж*7.

        controlSum = (controlSum % 11) % 10; // В соответствии с З = MOD(MOD(X;11);10).

        const resultObject = { // Подготовим объект для возврата результатов.
           code: inn.join(''),
           isCorrect: controlSum === inn[inn.length - 1] // Установим флаг корректности.
        }      

        if(resultObject.isCorrect){
            resultObject.sex = inn[inn.length - 2] % 2 === 0 ? 'female' : 'male'; // Если код корректен, то определяем пол.

            //  Тут может быть ваш код связанный с датой рождения.
            //  И количеством полных лет...

        }

        return resultObject;
    } 


    (function(){

        //******************** Test Case #01 *************************//

        let controlCode_01 = '2063463479'; //Correct, Male, 1956-06-29
        let controlResult_01 = parseINN(controlCode_01);

        console.assert(controlResult_01.code === controlCode_01, 'Check Code #01 Coincidence: FAIL'); //Проверяем совпадает ли переданный код с полученным в результирующем объекте.
        console.assert(controlResult_01.isCorrect, 'Check Code #01 isCorrect: FAIL'); //Проверяем флаг корректности кода.
        console.assert(controlResult_01.sex === 'male', 'Check Code #01 sex: FAIL'); //Проверяем корректность пола.
        console.assert(controlResult_01.dateOfBirth === '1956-06-29', 'Check Code #01 dateOfBirth: FAIL'); //Проверяем корректность даты рождения.

        //  Тут может быть ваш код который проверит количество полных лет


        //******************** Test Case #02 *************************//

        let controlCode_02 = '3463463460'; //Correct, Female, 1994-10-28
        let controlResult_02 = parseINN(controlCode_02);

        console.assert(controlResult_02.code === controlCode_02, 'Check Code #02 Coincidence: FAIL');
        console.assert(controlResult_02.isCorrect, 'Check Code #02 isCorrect: FAIL');
        console.assert(controlResult_02.sex === 'female', 'Check Code #02 sex: FAIL');
        console.assert(controlResult_02.dateOfBirth === '1994-10-28', 'Check Code #02 dateOfBirth: FAIL');
        //  Тут может быть ваш код который проверит количество полных лет


         //******************** Test Case #03 *************************//

         let controlCode_03 = '4564def57437 89abc'; //Некорректный код.
         let controlResult_03 = parseINN(controlCode_03);
 
         console.assert(!controlResult_03.isCorrect, 'Check Ivalid Code #03 isCorrect: FAIL'); //Проверяем на некорректном коде, возвращается ли false.
       

    })();

    