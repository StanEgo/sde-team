## Принципы

Есть предположение, что ключевым принципом является reusing. Всё остальное, в той или иной мере, вытается его обеспечить.

    todo KISS, DRY, SOLID, LoD, etc.

## Управляющие конструкции

-   Привычные управляющие конструкции надо полностью пересмотреть. Возьмем в качестве примера тот же цикл. Десятилетиями казалось, что его позиции незыблемы. Но как только многоядерные процессоры или big-data кластера становятся мейнстримом, привычный цикл 1..1000000000 уже кажется идиотизмом. И это логично, даже если ориентироваться на SOLID-принципы. Задача в большинстве случаев абстрагируется в "для каждого элемента в заданном диапазоне" и последовательный перебор - лишь частное решение.
