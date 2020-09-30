import CompanyEntity from "./CompanyEntity";
import GenreEntity from "./GenreEntity";
import PlatformEntity from "./PlatformEntity";

export interface IDetailedGame {
  id: number;
  name: string;
  release_date: string;
  rating: number;
  summary: string;
  cover_url: string;
  companyEntityList: [CompanyEntity];
  genreEntityList: [GenreEntity];
  platformEntityList: [PlatformEntity];
}
