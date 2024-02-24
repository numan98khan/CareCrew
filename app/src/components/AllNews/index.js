import React from "react";
import PageHeader from "../Headers/PageHeader";
import theme from "../../styles/theme.styles";
import { useNavigate } from "react-router-dom";
import IconButton from "../../components/Button/IconButton";
import BackButton from "../../components/Button/BackButton";
import { useListNews } from "../../apolloql/news";
import NewsCard from "../../components/NewsCard";
import {
  draftRichToText,
  reverseFormatDateTime,
  reverseFormatDate,
  displayDatetime,
} from "../../services/micro";
import { useAuth } from "../../context";

function AllNews({ onBackClick }) {
  const navigate = useNavigate();
  const { type } = useAuth();

  const { news, loading } = useListNews({ receiver: type });

  return (
    <div className="p-3 flex flex-col gap-3">
      <div className="flex justify-start">
        <div className="flex items-center w-full justify-between">
          <div className="flex items-center gap-2">
            <div onClick={onBackClick}>
              <BackButton />
            </div>
            <PageHeader text={"News"} />
          </div>
        </div>
      </div>

      <div className="h-fit w-full grid grid-cols-2 gap-2">
        {news?.map((item, index) => (
          <NewsCard
            index={index}
            headline={item.headline}
            news={draftRichToText(item.news)}
            author={item.author}
            datetime={displayDatetime(item.createdAt)}
            // datetime={"March 8, 2023  11:45AM"}
          />
        ))}
      </div>
    </div>
  );
}

export default AllNews;
