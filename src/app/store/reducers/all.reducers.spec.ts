import { initialState } from '../models/initial-state.const';
import { allReducer } from './all.reducers';
import { IMessageItem, IMessageModel } from '../models/messages-model.interface';
import { getAllMessagesSuccess } from '../actions/all.actions';

// Редьюсер - это просто чистая функция, как функцию их и тестируем, также есть возможность
// тестирования редьюсеров через селекторы, в файле app.selectors.spec есть пример
describe('AllReducers', () => {
    // Проверка на то чтобы наш редьюсер отдавал начальное состояние при левых и невалидных actions
    describe('unknown action', () => {
        it('should return the default state', () => {
            const action = {
                type: '123',
            };

            const state: IMessageModel = allReducer(initialState, action);

            expect(state).toBe(initialState);
        });
    });

    // Проверяем обновление состояния и то что при обновлении состоянии
    // объект не мутируется, а создаётся заново
    describe('getAllMessagesSuccess action', () => {
        it('should update the state in an immutable way', () => {
            const newStateMessages: IMessageItem[] = [{ id: 1, content: 'some content' }];

            const action = getAllMessagesSuccess({ messages: newStateMessages });
            const state = allReducer(initialState, action);

            // Сравниваем сами объекты
            expect(state.messages).withContext('toEqual').toEqual(newStateMessages);
            // Сравниваем ссылки на объекты и ожидаем что они не равны
            expect(state.messages).withContext('not.toBe').not.toBe(newStateMessages);
        });
    });
});
