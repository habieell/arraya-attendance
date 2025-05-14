"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal/Modal";
import { CreateButton } from "@/components/ui/button/ButtonCreate";
import FormUser from "@/components/form/admin/FormUsers";
import { Pencil, Trash2, View } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import UserDetailModal from "../example/ModalExample/UserDetailModal";
import { useUser } from "@/hooks/users/useUsers";
import { User } from "@/components/types/user";
import { useAttendanceUser } from "@/hooks/attendance/useAttendance"
import { ConfirmationModal } from "../ui/modal/ConfirmationModal";
import useUserAction from '@/hooks/users/useUsersAction';

export default function UserTable() {
  const { deleteUser } = useUserAction();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { isOpen, openModal, closeModal } = useModal();
  const [showConfirm, setShowConfirm] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const { user, loading, error, refetch } = useUser();
  const selectedUserId: string | null = selectedUser?.id ? String(selectedUser.id) : null;
  const { attendance, loading: loadingAttendance } = useAttendanceUser(selectedUserId);

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
          setSelectedUser(null);
        }}
      >
        <FormUser
          user={
            selectedUser
              ? {
                id: selectedUser.id,
                name: selectedUser.name,
                email: selectedUser.email,
                password: selectedUser.password,
                role_id: selectedUser.role?.id ? String(selectedUser.role.id) : '',
                company_id: selectedUser.company?.id ? String(selectedUser.company.id) : '',
                branch_id: selectedUser.branch?.id ? String(selectedUser.branch.id) : '',
                position_id: selectedUser.position?.id ? String(selectedUser.position.id) : '',
                department_id: selectedUser.department?.id ? String(selectedUser.department.id) : '',
                full_name: selectedUser.profile?.full_name ? String(selectedUser.profile.full_name) : '',
                birth_place: selectedUser.profile?.birth_place ? String(selectedUser.profile.birth_place) : '',
                birth_date: selectedUser.profile?.birth_date ? new Date(selectedUser.profile.birth_date) : null,
                address: selectedUser.profile?.address ? String(selectedUser.profile.address) : '',
                phone_number: selectedUser.profile?.phone_number ? String(selectedUser.profile.phone_number) : '',
                gender: selectedUser.profile?.gender ? String(selectedUser.profile.gender) : '',
                photo: selectedUser.profile?.photo ? String(selectedUser.profile.photo) : '',
              }
              : null
          }
          onSuccess={() => {
            refetch();
            closeModal();
            setSelectedUser(null);
          }}
        />
      </Modal>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[1000px]">
            <Table>
              <TableHeader className="bg-gray-100 dark:bg-white/[0.03]">
                <TableRow>
                  <TableCell isHeader className="px-5 py-3 font-semibold text-left text-sm text-gray-700 dark:text-white/90">Nama</TableCell>
                  <TableCell isHeader className="px-5 py-3 font-semibold text-left text-sm text-gray-700 dark:text-white/90">Email</TableCell>
                  <TableCell isHeader className="px-5 py-3 font-semibold text-left text-sm text-gray-700 dark:text-white/90">Role</TableCell>
                  <TableCell isHeader className="px-5 py-3 font-semibold text-left text-sm text-gray-700 dark:text-white/90">Nomor Telepon</TableCell>
                  <TableCell isHeader className="px-5 py-3 font-semibold text-left text-sm text-gray-700 dark:text-white/90">Perusahaan</TableCell>
                  <TableCell isHeader className="px-5 py-3 font-semibold text-left text-sm text-gray-700 dark:text-white/90">Aksi</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {Array.isArray(user) && user.length > 0 ? (
                  user.map((user) => (
                    <TableRow
                      key={user.id}
                      className="hover:bg-gray-50 dark:hover:bg-white/[0.05]"
                    >
                      <TableCell className="px-5 py-4 text-sm text-gray-800 dark:text-white/90">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden">
                            <Image
                              src={user.profile?.photo || '/images/user/user-01.jpg'}
                              alt={user.name}
                              width={40}
                              height={40}
                              className="object-cover"
                            />
                          </div>
                          <span>{user.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="px-5 py-4 text-sm text-gray-500">{user.email}</TableCell>
                      <TableCell className="px-5 py-4 text-sm text-gray-500">{user.role?.name ?? "-"}</TableCell>
                      <TableCell className="px-5 py-4 text-sm text-gray-500">{user.profile?.phone_number ?? "-"}</TableCell>
                      <TableCell className="px-5 py-4 text-sm text-gray-500">{user.company?.name ?? "-"}</TableCell>
                      <TableCell className="px-4 py-3 text-sm text-gray-700 dark:text-white">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedUser(user);
                              setShowDetailModal(true); // Tampilkan modal detail
                            }}
                            className="text-yellow-600 hover:text-yellow-800"
                          >
                            <View size={18} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedUser(user);
                              openModal();
                            }}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Pencil size={18} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedUser(user);
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
                    <TableCell colSpan={5} className="text-center px-5 py-4 text-sm text-gray-500">
                      Data pengguna tidak tersedia.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

          </div>
        </div>
      </div>

      <UserDetailModal
        isOpen={showDetailModal}
        onClose={() => {
          setSelectedUser(null);
          setShowDetailModal(false);
        }}
        user={selectedUser}
        attendance={attendance}
      />

      <ConfirmationModal
        isOpen={showConfirm}
        onClose={() => {
          setShowConfirm(false);
          setSelectedUser(null);
        }}
        onConfirm={() => {
          if (selectedUser?.id) {
            deleteUser(selectedUser.id, () => {
              refetch();
            });
          }
          setShowConfirm(false);
          setSelectedUser(null);
        }}
        title="Hapus data ini?"
        description={`User "${selectedUser?.name}" akan dihapus secara permanen.`}
        confirmText="Hapus"
        cancelText="Batal"
      />
    </>
  );
}
