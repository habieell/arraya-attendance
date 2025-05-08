"use client"
import React, { useState, useEffect } from "react";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal/Modal";
import { CreateButton } from "@/components/ui/button/ButtonCreate";
import FormRole from "@/components/form/admin/FormRole";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";
import { useRole } from "@/hooks/role/useRole";
import { Role } from "@/components/types/role";
import { Pencil, Trash2 } from "lucide-react";
import { ConfirmationModal } from "../ui/modal/ConfirmationModal";
import useRoleAction from '@/hooks/role/useRoleAction';

export default function RoleTable() {
  const { deleteRole } = useRoleAction();
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const { isOpen, openModal, closeModal } = useModal();
  const { role, loading, error, refetch } = useRole();
  const [showConfirm, setShowConfirm] = useState(false);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Terjadi kesalahan saat memuat data.</p>;
  return (
    <>
      <div className="text-end">
        <CreateButton onClick={openModal} />
      </div>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          closeModal();
          setSelectedRole(null);
        }}
      >
        <FormRole
          role={selectedRole}
          onSuccess={() => {
            refetch();
            closeModal();
            setSelectedRole(null);
          }}
        />
      </Modal>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[1000px]">
            <Table>
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05] bg-gray-50 dark:bg-white/[0.02]">
                <TableRow>
                  <TableCell isHeader className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-white">Nama</TableCell>
                  <TableCell isHeader className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-white">Singkatan</TableCell>
                  <TableCell isHeader className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-white">Aksi</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {Array.isArray(role) && role.length > 0 ? (
                  role.map((role) => (
                    <TableRow
                      key={role.id}
                      className="hover:bg-gray-50 dark:hover:bg-white/[0.05] cursor-pointer"
                      onClick={() => setSelectedRole(role)}
                    >
                      <TableCell className="px-4 py-3 text-sm text-gray-700 dark:text-white">{role.name}</TableCell>
                      <TableCell className="px-4 py-3 text-sm text-gray-700 dark:text-white">{role.slug_name ?? "-"}</TableCell>
                      <TableCell className="px-4 py-3 text-sm text-gray-700 dark:text-white">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedRole(role);
                              openModal();
                            }}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Pencil size={18} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedRole(role);
                              setShowConfirm(true);
                            }}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-4 text-gray-500">
                      Data Role tidak tersedia.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      <ConfirmationModal
        isOpen={showConfirm}
        onClose={() => {
          setShowConfirm(false);
          setSelectedRole(null);
        }}
        onConfirm={() => {
          if (selectedRole?.id) {
            deleteRole(selectedRole.id, () => {
              refetch();
            });
          }
          setShowConfirm(false);
          setSelectedRole(null);
        }}
        title="Hapus data ini?"
        description={`Role "${selectedRole?.name}" akan dihapus secara permanen.`}
        confirmText="Hapus"
        cancelText="Batal"
      />

    </>
  )
}
