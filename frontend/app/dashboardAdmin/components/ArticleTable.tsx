"use client";

import { motion } from "framer-motion";
import { FiEdit, FiTrash2, FiEye } from "react-icons/fi";


type Article = {
  _id: string;
  title: string;
  image: string;
  date: string;
};



export default function ArticleTable({
  articles,
  onDelete,
  onEdit,
  onPreview,
}: any) {
  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-4 text-left">Titre</th>
            <th className="p-4 text-center">Date</th>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {articles.map((article: any) => (
            <motion.tr
              key={article._id}
              whileHover={{ backgroundColor: "#f9fafb" }}
              className="border-t"
            >
              <td className="p-4 font-medium">{article.title}</td>

              <td className="p-4 text-center">{article.date}</td>

              <td className="p-4 flex justify-end gap-4 text-lg">
                <FiEye
                  onClick={() => onPreview(article)}
                  className="cursor-pointer text-blue-600"
                />
                <FiEdit
                  onClick={() => onEdit(article)}
                  className="cursor-pointer text-yellow-600"
                />
                <FiTrash2
                  onClick={() => onDelete(article)}
                  className="cursor-pointer text-red-600"
                />
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

