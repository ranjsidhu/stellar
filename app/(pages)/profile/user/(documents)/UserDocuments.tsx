"use client";

import { useEffect, useState } from "react";
import { DocumentCardProps, UserDocumentType } from "@/app/types";
import { getUserId } from "@/app/utils/storage";
import { notify, SectionLoading, FileUpload } from "@/app/components";
import DocumentCard from "./DocumentCard";
import { downloadFile } from "@/app/utils";

export default function UserDocuments() {
  const [userDocuments, setUserDocuments] = useState<UserDocumentType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDocuments = async () => {
      try {
        setLoading(true);
        const userId = getUserId();
        const response = await fetch(`/api/user_documents/${userId}`);
        const data = await response.json();
        setUserDocuments(data.response);
      } catch (error) {
        notify(
          "error",
          "Error",
          "An error occurred while fetching user documents"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUserDocuments();
  }, []);

  const handleDownload = async (doc: DocumentCardProps["document"]) => {
    try {
      fetch(`/api/bucket/cv/${doc.file_id}`).then((res) => {
        res.blob().then((data) => {
          const filename = res.headers.get("X-Filename") || "download.docx";
          downloadFile(data, filename);
        });
      });
    } catch (error) {
      notify("error", "Error", "An error occurred while downloading document");
    }
  };

  const handleDelete = async (doc: DocumentCardProps["document"]) => {
    try {
      fetch(`/api/bucket/cv/${doc.file_id}`, {
        method: "DELETE",
        body: JSON.stringify({ id: doc.id }),
      }).then((res) => {
        if (res.ok) {
          setUserDocuments((prev) => prev.filter((d) => d.id !== doc.id));
          notify("success", "Success", "Document deleted successfully");
        } else {
          notify("error", "Error", "An error occurred while deleting document");
        }
      });
    } catch (error) {
      notify("error", "Error", "An error occurred while deleting document");
    }
  };

  const onSuccess = (id: number, file_id: string, filename: string) => {
    setUserDocuments((prev) => [
      ...prev,
      { id, file_id, filename, file_types: { name: "CV" } },
    ]);
  };

  return (
    <SectionLoading loading={loading}>
      <div className="space-y-6">
        <div className="bg-white-6 p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Upload Document
          </h2>
          <FileUpload route="cv" onSuccess={onSuccess} />
        </div>
      </div>
      {userDocuments.length && (
        <div className="space-y-4 mt-5">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Your Documents
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userDocuments.map((doc) => (
              <DocumentCard
                key={doc.id}
                document={doc}
                onDownload={handleDownload}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      )}
    </SectionLoading>
  );
}