import React from "react";
import SearchIcon from "../../../assets/svg/search-icon.svg";
import EditIcon from "../../../assets/svg/edit-icon.svg";
import AdminTable from "../components/adminTable";
import Pagination from "../components/pagination";
import { useTranslation } from "react-i18next";
import { APP_CONFIG } from "../../../constants/constants";
import HeaderView from "../../../components/admin/headerView";
import ButtonIconPlus from "../../../assets/svg/buttonicon-plus.svg";
import ListingPageSubHeader from "../components/listingPageSubHeader";
import ListingTableHeader, { TListingFilters } from "../components/listingTableHeader";

const ScreenDashboardAdminVehicles = () => {
  const { t: tFilters } = useTranslation('translation', { keyPrefix: 'admins.filters'});
  const { t } = useTranslation('translation', { keyPrefix: 'admins.vehicles'});

  const filters: TListingFilters[] = [
    {
      slug: "active",
      title: tFilters("active"),
    },
    {
      slug: "inactive",
      title: tFilters("inactive"),
    },
    {
      slug: "both",
      title: tFilters("both"),
    },
  ];
  const [activeFilterSlug, setActiveFilterSlug] = React.useState<string>("active");

  return (
    <>
      <HeaderView title={t('heading')} />
      <div className={`${APP_CONFIG.DES.DASH.P_HORIZ} pt-4`}>
        <ListingPageSubHeader
          heading={t("sub_heading")}
          buttonText={t("add_new")}
          buttonCallback={() => console.log("Add new button clicked")}
        />
        <ListingTableHeader
          heading={t("listing_heading")}
          searchBoxPlaceholder={t("search_placeholder")}
          filters={filters}
          activeFilterSlug={activeFilterSlug}
          handleFilterChange={(slug) => setActiveFilterSlug(slug)}
        />
        <div className="py-4 mt-4">
          {/* <AdminTable columns={columns} data={data} /> */}
          <Pagination pageSize={15} currentPage={2} count={28} />
        </div>
      </div>
    </>
  );
};

export default ScreenDashboardAdminVehicles;
