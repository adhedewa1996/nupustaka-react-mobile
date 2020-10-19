import { combineReducers } from 'redux';
import AuthReducer from './user';
import categoriesReducer from './perpustakaan';
import categoriesbooksReducer from './category';
import displaybooksReducer from './home';
import bookReducer from './book';
import beliReducer from './transaksi';
import voucherReducer from './voucher';
import similarbookReducer from './similarbook';
import cekbeliReducer from './transaksi/cekBeli';
import sewaReducer from './transaksi/postSewa';
import ceksewaReducer from './transaksi/cekSewa';
import pinjamReducer from './transaksi/postPinjam';
import cekpinjamReducer from './transaksi/cekPinjam';
import searchbooksReducer from './search';
import searchtextReducer from './search/text';
import bookmarkbookReducer from './book/postBookmark';
import cekbookmarkbookReducer from './book/cekBookmark';
import koleksibookReducer from './koleksi';

export default combineReducers({
  auth: AuthReducer,
  categories: categoriesReducer,
  categoriesbooks: categoriesbooksReducer,
  displaybooks: displaybooksReducer,
  book: bookReducer,
  voucher: voucherReducer,
  similarbook: similarbookReducer,
  beli: beliReducer,
  cekbeli: cekbeliReducer,
  sewa: sewaReducer,
  ceksewa: ceksewaReducer,
  pinjam: pinjamReducer,
  cekpinjam: cekpinjamReducer,
  searchbooks: searchbooksReducer,
  bookmarkbook: bookmarkbookReducer,
  cekbookmarkbook: cekbookmarkbookReducer,
  koleksibook: koleksibookReducer,
  searchtext: searchtextReducer
});