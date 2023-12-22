import { EState, IMessageModel } from '../models/messages-model.interface';
import { allMessages, favouriteMessages } from './app.selectors';
import { initialState } from '../models/initial-state.const';
import { allReducer } from '../reducers/all.reducers';
import { getAllMessagesFailure } from '../actions/all.actions';

// Селекторы - могучая вещь которая позволяет точечно выбирать данные из store
// Тестируем корректность набора выбранных данных
describe('AppSelector', () => {
    // Извлечение данных из стора через редьюсер
    it('Select allMessages through reducer', () => {
        // Мы ожидаем что селектор отдаст этот объект при выпадении ошибки
        const state: IMessageModel = {
            state: EState.ERROR,
            error: 'ERROR',
            messages: undefined,
        };
        // Записываем результат работы селектора allMessages на объекте который прокидываем в projector
        const result = allMessages.projector({
            // Примеряем редьюсер
            all: allReducer(initialState, getAllMessagesFailure({ error: 'ERROR' })),
            favourite: initialState,
            deleted: initialState,
        });

        // Тут мы пишем конструкцию как при тестировании редюсеров
        expect(result).toEqual(state);
        expect(result).not.toBe(state);
    });

    // Извлечение данных из стора без редьюсера
    it('Select allMessages state', () => {
        const state: IMessageModel = {
            state: EState.ERROR,
            error: 'ERROR',
            messages: undefined,
        };
        const result = allMessages.projector({
            // Просто указываем объект без редьюсера
            all: state,
            favourite: initialState,
            deleted: initialState,
        });

        expect(result).withContext('all').toEqual(state);
        expect(result).toBe(state);
    });

    it('Select favouriteMessages state', () => {
        const state: IMessageModel = {
            state: EState.ERROR,
            error: 'ERROR',
            messages: undefined,
        };
        const result = favouriteMessages.projector({
            all: state,
            favourite: initialState,
            deleted: state,
        });

        expect(result).withContext('favouriteMessages').toEqual(initialState);
        expect(result).toBe(initialState);
    });
});
