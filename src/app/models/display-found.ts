import { Search } from './Search';
import { ShopDetailsForUsers } from './ShopDetailsForUsers';
export class DisplayFound extends ShopDetailsForUsers {
    nameShop: string;
    mailShop: string;
    productsInShop: string;
    codeSearchesInShop: number[];
    isChecked: boolean;
}
